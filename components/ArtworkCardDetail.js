import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import LoadPage from '@/components/LoadPage';
import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';

// MIGH BE AN ISSUE HERE WITH identifier.objectID

export default function ArtworkCard(prop){
   const identifier = prop.objectID;
   const { data, error } = useSWR(identifier.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${identifier.objectID}`: null);
   const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
   const [showAdded, setShowAdded] = useState(false);

   useEffect(()=>{
      setShowAdded(favouritesList?.includes(identifier.objectID))
   }, [favouritesList]);

   async function favouritesClicked(data){
      if(showAdded){
         setFavouritesList(await removeFromFavourites(identifier.objectID));
         setShowAdded(false);
      }else{
         setFavouritesList(await addToFavourites(identifier.objectID)); 
         setShowAdded(true);
      }
   };

   if(error){
      return <Error statusCode={404} />
   }

   if(!data){
      return(
         <LoadPage />
      );
   }else{
      return(
         <>
            <Card className="btn-outline-secondary">
               {data?.primaryImage ? <Card.Img variant="top" src={data?.primaryImage} /> : ''}
               <Card.Body>
                  <Card.Title>{data?.title ? data?.title : "N/A"}</Card.Title>
                  <Card.Text>
                     <b>Date: </b> {data?.objectDate ? data?.objectDate: "N/A"}<br />
                     <b>Classification: </b> {data?.classification ? data?.classification : "N/A"}<br />
                     <b>Medium: </b>{data?.medium ? data?.medium : "N/A"}<br /><br />
                     <b>Artist: </b> {data.artistDisplayName || "N/A"} {data.artistWikidata_URL && <>( <a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer"> wiki </a>)</>}<br />
                     <b>Credit Line: </b>{data?.creditLine ? data?.creditLine:"N/A"}<br />
                     <b>Dimensions: </b>{data?.dimensions ? data?.dimensions : "N/A"}<br /> <br />
                     <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={e=>favouritesClicked(data)}>+ Favourite <>{showAdded && "( added )"}</></Button>
                  </Card.Text>
               </Card.Body>
            </Card>          
         </>
      );
   }
}



