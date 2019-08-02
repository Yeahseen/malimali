import React from "react";

function ItemForm({
    name,
     price,
    Description,
    Review,
    url,
    image,
    formSubmitting,
    validationErrors,
    formSuccess,
    formError,
    handleChange,
    handleToggleCheckbox,
    resetFormState,
    handleSubmit
}) {
    const disabled =
        !name ||
        !price ||
        !Description ||
        !Review ||
        !url ||
        (Array.isArray(image) && image.length === 0)

    return (
        <form className="mvls-form" onSubmit={handleSubmit}>
            {formSuccess && (
                <p className="mvls-alert mvls-alert-success">
                    Form submitted successfully.
                </p>
            )}
            {formError && (
                <p className="mvls-alert mvls-alert-error">
                    Sorry, error submitting form. Please retry.
                </p>
            )}
            <div className="mvls-form-row">
                <div className="mvls-form-col">
                    <label htmlFor="title">Name</label>
                    <div className="mvls-form-input-group">
                        <input
                            type="text"
                            name="title"
                            className={
                                validationErrors.title ? "has-error" : ""
                            }
                            autoComplete="off"
                            value={name}
                            onChange={handleChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.title && (
                            <span className="mvls-form-input-error">
                                {validationErrors.title}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mvls-form-col">
                    <label htmlFor="price">Price</label>
                    <div className="mvls-form-input-group">
                        <input
                            type="text"
                            name="price"
                            className={
                                validationErrors.releaseYear ? "has-error" : ""
                            }
                            autoComplete="off"
                            value={price}
                            onChange={handleChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.releaseYear && (
                            <span className="mvls-form-input-error">
                                {validationErrors.releaseYear}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="mvls-form-row">
                <div className="mvls-form-col">
                <label htmlFor="url">Image Link</label>
                    <div className="mvls-form-input-group">
                        <input
                            type="text"
                            name="url"
                            className={
                                validationErrors.posterUrl ? "has-error" : ""
                            }
                            autoComplete="off"
                            value={url}
                            onChange={handleChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.url && (
                            <span className="mvls-form-input-error">
                                {validationErrors.url}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="mvls-form-row">
                <div className="mvls-form-col">
                    <label htmlFor="description">Description</label>
                    <div className="mvls-form-input-group">
                        <textarea
                            name="description"
                            className={
                                validationErrors.description ? "has-error" : ""
                            }
                            autoComplete="off"
                            rows={5}
                            value={Description}
                            onChange={handleChange}
                            disabled={formSubmitting}
                        />
                        {validationErrors.description && (
                            <span className="mvls-form-input-error">
                                {validationErrors.description}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mvls-form-col">
                    <label>Review</label>
                    <div className="mvls-form-input-group">
                        <div className="mvls-checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="Review"
                                    value="1"
                                    checked={Review.includes("1")}
                                    onChange={handleToggleCheckbox}
                                />
                                &nbsp;1
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Review"
                                    value="2"
                                    checked={Review.includes("2")}
                                    onChange={handleToggleCheckbox}
                                />
                                &nbsp;2
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Review"
                                    value="3"
                                    checked={Review.includes("3")}
                                    onChange={handleToggleCheckbox}
                                />
                                &nbsp;3
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Review"
                                    value="4"
                                    checked={Review.includes("4")}
                                    onChange={handleToggleCheckbox}
                                />
                                &nbsp;4
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Review"
                                    value="5"
                                    checked={Review.includes("5")}
                                    onChange={handleToggleCheckbox}
                                />
                                &nbsp;5
                            </label>
                        </div>
                        {validationErrors.genres && (
                            <span className="mvls-form-input-error">
                                {validationErrors.Review}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <button
                className="mvls-btn mvls-btn-form"
                type="submit"
                disabled={disabled || formSubmitting}
            >
                Submit
            </button>
            <button
                className="mvls-btn mvls-btn-form"
                type="reset"
                onClick={resetFormState}
                disabled={formSubmitting}
            >
                Reset
            </button>
        </form>
    );
}

export default ItemForm;