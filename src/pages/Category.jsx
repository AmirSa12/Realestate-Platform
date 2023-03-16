import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'


function Category() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(()=>{
        const fetchListings = async () => {
            try {
                // Get refrence
                const listingsRef = collection(db, 'listings')

                // create query
                const q = query(listingsRef, where('type', '==' , params.categoryName), orderBy('timestamp', 'desc'), limit(3))

                //Excute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)

                const listings = []

                querySnap.forEach((doc)=>{
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch data')
            }
        }

        fetchListings()
    }, [params.categoryName])


    // Load More
    const onFetchMoreListings = async () => {
        try {
            // Get refrence
            const listingsRef = collection(db, 'listings')

            // create query
            const q = query(listingsRef, where('type', '==' , params.categoryName), orderBy('timestamp', 'desc'), limit(10), startAfter(lastFetchedListing))

            //Excute query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)

            const listings = []

            querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            setListings((prevState)=> [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            toast.error('Could not fetch data')
        }
    }



  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
                {params.categoryName === 'rent' ? 'Places for rent' : 'Places for sale'}
                {console.log('ss')}
            </p>
        </header>

        {loading ? <Spinner/> : listings && listings.length > 0 ? 
        <>
        <main>
           <ul className="categoryListings">
            {listings.map((listing)=>(
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
            ))}
           </ul>
        </main>

        <br />
        <br />
        <br />
        {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings} >Load More</p>
        )}

        </> : <p>No Listings for {params.categoryName}</p> }
    </div>
  )
}

export default Category