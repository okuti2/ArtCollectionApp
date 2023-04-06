import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ArtworkCard from '@/components/ArtworkCard.js';
import {Card, Pagination, Row, Col} from 'react-bootstrap';
import LoadPage from '@/components/LoadPage';
import validObjectIDList from '@/public/data/validObjectIDList.json';
import Error from "next/error";

const PER_PAGE = 12;

export default function Home(){
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);
    const router = useRouter(); 
    let finalQuery = router.asPath.split('?')[1]; 
    const {data, error} = useSWR('https://collectionapi.metmuseum.org/public/collection/v1/search?'+finalQuery);

    function previousPage(){
        if (page > 1) setPage(page-1);
    };

    function nextPage(){
        if(page < artworkList.length) setPage(page+1);
    };

    useEffect(()=>{
        if(data){
           let results = [];
           let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x)); 
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {     
               const chunk = filteredResults.slice(i, i + PER_PAGE);     
               results.push(chunk); 
            } 
            
            setArtworkList(results); 
            setPage(1);
        }
        }, [data]
    );

    if(error){
        return <Error statusCode={404} />
    }


    if(artworkList){
        let result = artworkList[page-1];
        return(
            <>
                <Row className="gy-4">
                    {artworkList.length > 0 &&
                        result.map((art)=>(
                             <Col lg={3} key={art}><ArtworkCard objectID={art} /></Col>
                            
                        ))
                    }
                    {artworkList.length == 0 &&
                        <Card body><h4>Nothing Here</h4><br />
                            Try searching for something else.
                        </Card>
                    }
                </Row><br />
                {artworkList.length > 0 &&
                    <Row>
                        <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage}/>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage}/>
                        </Pagination>
                        </Col>
                    </Row>
                }

            </>
        )
    }else{
        return(
            <LoadPage />
        );
    }

}


