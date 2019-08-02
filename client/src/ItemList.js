import React from "react";
import axios from  "axios";
import Item from "./Item";
import Loading from "./Loading";
import Error from "./Error";
import { Link } from "@reach/router";


class ItemList extends React.Component {
       constructor(props) {
           super(props);
           this.state = {
                 
               Items: [],
             loading: false,
             error: false

           };
       }

       componentDidMount() {
                 this.fetchItems();
             }
        
             fetchItems() {
                 this.setState({ loading: true, error: false });
        
                 axios
                     .get("/api/item")
                     .then(response => {
                         this.setState({
                             Items: response.data,
                             loading: false,
                             error: false
                         });
                     })
                     .catch(error => {
                         this.setState({
                             Items: [],
                             loading: false,
                             error: true
                         });
                     });
             }
    
       render() {
               const { Items, loading, error } = this.state;

               if (loading) {
                   return <Loading/>;
               }
               if (error) {
                   return <Error/>;
               }
               
        
    return (
        <div className="mvls-container">
            <div className="mvls-search">
                <div className="mvls-search-item">
                    <b>
                     <Link to= "/search">
                         search
                    </Link>
                    </b>
                    </div>
            </div>
            <nav className="mvls-nav">
            <span className="mvls-top">Popular Items</span>
            </nav>
            <div className="mvls-Item-List">
            {Items.map(item => (
                        <Item key={item.id} popularItem={item} />
                    ))}
               
            </div>
        </div>
    );
    }
}

export default ItemList;