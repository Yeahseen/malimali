import React from "react";
import axios from "axios";
import ItemForm from "./ItemForm";
import ItemTable from "./ItemTable";

class ItemAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            Description: "",
            Review: "",
            url: [],
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            deleteSuccess: false
        };

        this.resetFormState = this.resetFormState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    resetFormState() {
        this.setState({
            name: "",
            price: "",
            Description: "",
            Review: "",
            url: [],
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            deleteSuccess: false
        });
    }

    isValid() {
        const { validationErrors, isValid } = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    validateFormInput(data) {
        const validationErrors = {};
        const {
            name,
            price,
            Description,
            Review,
            url
        } = data;

        if (!name) {
            validationErrors.title = "This field is required";
        }

        if (!price) {
            validationErrors.duration = "This field is required";
        }

        if (!Description) {
            validationErrors.description = "This field is required";
        }

        if (!Review) {
            validationErrors.posterUrl = "This field is required";
        }

        if (Array.isArray(url) && url.length === 0) {
            validationErrors.genres = "This field is required";
        }

        return {
            validationErrors,
            isValid: Object.keys(validationErrors).length === 0
        };
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });
    }

    handleToggleCheckbox(e) {
        const checked = e.target.checked;
        const value = e.target.value;

        if (checked) {
            this.setState(prevState => ({
                url: prevState.url.concat(value)
            }));
        } else {
            this.setState(prevState => ({
                url: prevState.url.filter(url => url !== value)
            }));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const {
            editing,
            id,
            name,
            price,
            Description,
            Review,
            url
        } = this.state;
        const { items, updateItems } = this.props;

        if (this.isValid()) {
            this.setState({
                validationErrors: {},
                formSubmitting: true,
                formSuccess: false,
                formError: false
            });

            if (editing) {
                // Existing record - update
                axios
                    .put(`/api/item/${id}`, {
                        name,
                        price,
                        Description,
                        Review,
                        url
                    })
                    .then(response => {
                        this.resetFormState();

                        const index = items.findIndex(c => c.id === id);
                        this.setState({
                                                         formSuccess: true
                                                     });
                            
                                                     updateItems([
                                                         ...items.slice(0, index),
                                                         {
                                                             id,
                                                             name,
                                                             price,
                                                             Description,
                                                             Review,
                                                             url: url.join(",")
                                                         },
                                                         ...items.slice(index + 1)
                                                     ]);
                    
                    })
                    

                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            } else {
                // New record - Save
                axios
                    .post("/api/item", {
                        name,
                        price,
                        Description,
                        Review,
                        url
                    })
                    .then(response => {
                        this.resetFormState();
                    
                        this.setState({
                                                         formSuccess: true
                                                     });
                            
                                                     updateItems([
                                                         ...items,
                                                         {
                                                             id: response.data,
                                                             name,
                                                             price,
                                                             Description,
                                                             Review,
                                                             url: url.join(",")
                                                         }
                                                     ]);
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            }
        }
    }

    handleEditItem(item) {
        return () => {
            this.setState({
                ...item,
                genres: item.url.split(","),
                editing: true
            });
        };
    }

    handleDeleteItem(item, items) {
        return () => {
            const { id, name } = item;
            const { updateItems } = this.props;

            // eslint-disable-next-line no-restricted-globals
            if (confirm(`Are you sure you want to delete '${name}'?`)) {
                axios
                    .delete(`/api/item/${id}`)
                    .then(response => {
                        const index = items.findIndex(c => c.id === id);

                        this.setState({
                                                         deleteSuccess: true
                                                     });
                            
                                                     updateItems([
                                                         ...items.slice(0, index),
                                                         ...items.slice(index + 1)
                                                     ]);
                    })
                    .catch(error => {
                        this.setState({
                            deleteSuccess: false
                        });
                    });
            }
        };
    }

    render() {
        const {
            name,
            price,
            Description,
            Review,
            url,
            editing,
            formSubmitting,
            validationErrors,
            formSuccess,
            formError,
            deleteSuccess
        } = this.state;
        const { items, itemsLoading, itemsError } = this.props;

        return (
            <div className="mvls-movie-admin">
                <h1>items</h1>
                <h3>{editing ? "Edit Item" : "Add Item"}</h3>
                <ItemForm
                    name={name}
                    price={price}
                    Description={Description}
                    Review={Review}
                    url={url}
                    formSubmitting={formSubmitting}
                    validationErrors={validationErrors}
                    formSuccess={formSuccess}
                    formError={formError}
                    handleChange={this.handleChange}
                    handleToggleCheckbox={this.handleToggleCheckbox}
                    resetFormState={this.resetFormState}
                    handleSubmit={this.handleSubmit}
                />
                <ItemTable
                    items={items}
                    tableLoading={itemsLoading}
                    tableError={itemsError}
                    deleteSuccess={deleteSuccess}
                    onEditItem={this.handleEditMovie}
                    onDeleteItem={this.handleDeleteItem}
                />
            </div>
        );
    }
}

export default ItemAdmin;