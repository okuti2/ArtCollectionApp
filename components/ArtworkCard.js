import useSWR from 'swr';
import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import LoadPage from '@/components/LoadPage';

export default function ArtworkCard(prop){
    //return <>Test</>
    const objID = prop.objectID;
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objID}`);
    
    if(error){
        return <Error statusCode={404} />
    }

    if(!data){
        return (
            <>
                <LoadPage />     
            </>
            );
    }else{
        return (
            <>
                <Card className="btn btn-outline-primary"> 
                    {data?.primaryImageSmall ? <Card.Img variant="top" src={data?.primaryImageSmall} /> : <Card.Img variant="top" src='https://via.placeholder.com/375x375.png?text=[+Not+Available+]'/>}
                    <Card.Body>
                        <Card.Title>{data?.title ? data?.title : "N/A"}</Card.Title>
                        <Card.Text>
                            <b>Date: </b> {data?.objectDate ? data?.objectDate: "N/A"}<br />
                            <b>Classification: </b> {data?.classification ? data?.classification : "N/A"} <br />
                            <b>Medium: </b>{data?.medium ? data?.medium : "N/A"}<br />
                        </Card.Text>
                        <Link href={`/artwork/${data?.objectID}`}><Button variant="outline-light"><b>ID: </b>{data?.objectID}</Button></Link>
                    </Card.Body>
                </Card>                
            </>
        );

    }
}


