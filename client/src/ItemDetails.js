import React from "react";
import axios from "axios";
 import Loading from "./Loading";
 import Error from "./Error";

  class ItemDetails extends React.Component {
         constructor(props) {
             super(props);
             this.state = {
                 itemDetails: [],
                 cinemas: [],
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
             const itemDetailsPromise = axios.get(`/api/item/${itemId}`);
             const cinemasPromise = axios.get(`/api/item/${itemId}/cinemas`);
    
             axios
                 .all([itemDetailsPromise, cinemasPromise])
                 .then(
                     axios.spread((itemDetailsResponse, cinemasResponse) => {
                         this.setState({
                             movieDetails: itemDetailsResponse.data,
                             cinemas: cinemasResponse.data,
                             loading: false,
                             error: false
                         });
                     })
                 )
                 .catch(error => {
                     this.setState({
                         itemDetails: [],
                         cinemas: [],
                         loading: false,
                         error: true
                     });
                 });
         }
    
         toDateString(dateTime) {
             const date = new Date(dateTime);
             const year = date.getFullYear();
             const month = date.getMonth() + 1;
             const day = date.getDate();
    
             return `${year}-${month}-${day}`;
         }
    
         render() {
             const { itemDetails, cinemas, loading, error } = this.state;
    
             if (loading) {
                 return <Loading />;
             }
    
             if (error) {
                 return <Error />;
             }
    
             if (itemDetails.length !== 1) {
             return (
                     <Error message="Sorry, the movie does not exist. Please retry." />
                 );
             }
    
             const {
                 title,
                 description,
                 genres,
                 duration,
                 release_year,
                 poster_url
             } = itemDetails[0];
             const cinemaNameDateStrings = cinemas.map(cinema => {
                 const dateString = this.toDateString(cinema.time);
    
                 return `${cinema.name}:${dateString}`;
             });
             const uniqueCinemaNameDateStrings = [...new Set(cinemaNameDateStrings)];
             const cinemasPlayingMovie = uniqueCinemaNameDateStrings.map(
                 cinemaNameDate => {
                     const cinemaName = cinemaNameDate.split(":")[0];
                     const datePlaying = cinemaNameDate.split(":")[1];
                     const times = cinemas
                      .filter(
                             cinema =>
                                 cinema.name === cinemaName &&
                                 this.toDateString(cinema.time) === datePlaying
                         )
                         .map(cinema => {
                             const timeFormatter = new Intl.DateTimeFormat("en", {
                                 hour: "numeric",
                                 minute: "numeric",
                                 hour12: true
                             });
    
                             return timeFormatter.format(new Date(cinema.time));
                         });
    
                     const dateFormatter = new Intl.DateTimeFormat("en", {
                         weekday: "long",
                         year: "numeric",
                         month: "long",
                         day: "numeric"
                     });
    
                     return {
                         cinemaName,
                         datePlaying: dateFormatter.format(new Date(datePlaying)),
                         times
                     };
                 }
             );
    
             return (
                 <div className="mvls-container">
                     <div className="mvls-movie-details-wrapper">
                         <div className="mvls-movie-details">
                             <img
                                 className="mvls-movie-details-poster"
                                 src={poster_url}
                                 alt={title}
                             />
                             <div className="mvls-movie-details-info">
                                 <h2>{title}</h2>
                                 <p>{description}</p>
                                 <p>
                                     <span>Genre</span>: {genres}
                                 </p>
                                 <p>
                                     <span>Duration</span>: {duration} minutes
                                 </p>
                                 <p>
                                     <span>Year</span>: {release_year}
                                 </p>
                             </div>
                         </div>
                     </div>
                     <div className="mvls-movie-cinemas">
                         <h2>List of Cinemas playing Movie</h2>
                         {cinemasPlayingMovie.map(cinema => {
                             const { cinemaName, datePlaying, times } = cinema;
    
                             return (
                                 <div
                                     key={`${cinemaName}:${datePlaying}`}
                                     className="mvls-movie-cinema"
                                 >
                                     <h3>{cinemaName}</h3>
                                     <p>{datePlaying}</p>
                                     <p>
                                         {times.map(time => (
                                             <span key={time}>{time}</span>
                                         ))}
                                     </p>
                                 </div>
                             );
                         })}
                     </div>
                 </div>
             );
         }
     }

export default ItemDetails;