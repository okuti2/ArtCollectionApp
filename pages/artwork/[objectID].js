import { useRouter } from 'next/router';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';
import {Row, Col} from 'react-bootstrap';

export default function Artwork(){
    const router = useRouter();
    const objID = router.query;
    return(
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objID} />
                </Col>
            </Row>
        </>
    );
}