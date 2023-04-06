import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import LoadPage from "@/components/LoadPage";

export default function Favourites(){
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;

    if(favouritesList){
       
        return(
            <>
                <Row className="gy-4">
                    {favouritesList.length > 0 &&
                        favouritesList.map((art)=>(
                             <Col lg={3} key={art}><ArtworkCard objectID={art} /></Col>
                        ))
                    }
                    {favouritesList.length == 0 &&
                        <Card body><h4>Nothing Here</h4><br />
                            Try adding some new artwork to the list.
                        </Card>
                    }
                </Row><br />
            </>
        )
    }else{
        return(
            <LoadPage />
        );
    }

}