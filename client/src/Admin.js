import React from "react";
import axios from "axios";
import ItemAdmin from "./ItemAdmin";

class Admin extends React.Component {
         constructor(props) {
             super(props);
             this.state = {
                 items: [],
                 itemsLoading: false,
                 itemsError: false,
             };
    
             this.updateItems = this.updateItems.bind(this);
         }
    
         componentDidMount() {
             this.fetchItems();
         }
    
         
     fetchItems() {
             this.setState({ itemsLoading: true, itemsError: false });
    
             axios
                 .get("/api/item")
                 .then(response => {
                     this.setState({
                         items: response.data.map(data => ({
                             ...data,
                             image: data.year,
                             url: data.url
                         })),
                         itemsLoading: false,
                         itemsError: false
                     });
                 })
                 .catch(error => {
                     this.setState({
                         items: [],
                         itemsLoading: false,
                         itemsError: true
                     });
                 });
         }
    
    
         updateItems(items) {
             this.setState({ items });
         }
    
         render() {
             const { items,
                 itemsLoading, 
                 itemsError 
                } = this.state;
    
             return (
                 <div className="mvls-container">
                     <ItemAdmin
                         items={items}
                         itemsLoading={itemsLoading}
                         itemsError={itemsError}
                         updateItems={this.updateItems}
                     />
                 </div>
             );
         }
     }
export default Admin;