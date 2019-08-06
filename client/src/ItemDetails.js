import React from "react";
import axios from "axios";
 import Loading from "./Loading";
 import Error from "./Error";

  class ItemDetails extends React.Component {
         constructor(props) {
             super(props);
             this.state = {
                 ItemDetails: [],
                 loading: false,
                 error: false
             };
         }
    
         componentDidMount() {
             this.fetchItemDetails();
         }
    
         fetchItemDetails() {
             this.setState({ loading: true, error: false });
    
             const { itemId } = this.props;
             const itemDetailsPromise = axios.get(`/api/item/${itemId}`)
    
             axios
                 .all([itemDetailsPromise ])
                 .then(
                     axios.spread((ItemDetailsResponse) => {
                         this.setState({
                             itemDetails: ItemDetailsResponse.data,
                             loading: false,
                             error: false
                         });
                     })
                 )
                 .catch(error => {
                     this.setState({
                         itemDetails: [],
                         loading: false,
                         error: true
                     });
                 });
         }
         
    
         render() {
             const { ItemDetails, loading, error } = this.state;
    
             if (loading) {
                 return <Loading />;
             }
    
             if (error) {
                 return <Error />;
             }
    
             if (ItemDetails.length !== 1) {
             return (
                     <Error message="Sorry, the item does not exist. Please retry." />
                 );
             }
    
             const {
                 name,
                 Description,
                 Review,
                 price,
                 url
             } = ItemDetails[0];
             
    
             return (
                 <div className="mvls-container">
                     <div className="mvls-item-details-wrapper">
                         <div className="mvls-item-details">
                             <img
                                 className="mvls-item-details-poster"
                                 src={url}
                                 alt={name}
                             />
                             <div className="mvls-item-details-info">
                                 <h2>{name}</h2>
                                 <p>{Description}</p>
                                 <p>
                                     <span>Review</span>: {Review}
                                 </p>
                                 <p>
                                     <span>price</span>: {price} minutes
                                 </p>
                             </div>
                         </div>
                     </div>
                 </div>
             );
         }
     }

export default ItemDetails;