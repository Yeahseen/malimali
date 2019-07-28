import React from "react";

function ItemTable({
    items,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditItem,
    onDeleteItem
}) {
    if (tableLoading) {
        return <p className="mvls-table-loading">Loading movies...</p>;
    }

    return (
        <div className="mvls-table">
            {deleteSuccess && (
                <p className="mvls-alert mvls-alert-success">
                    Record deleted successfully.
                </p>
            )}
            {tableError && (
                <p className="mvls-alert mvls-alert-error">
                    Sorry, a server error occurred. Please retry.
                </p>
            )}
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Release Year</th>
                        <th>Duration</th>
                        <th>Poster URL</th>
                        <th>Description</th>
                        <th>Genres</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {items.length === 0 && (
                    <tbody>
                        <tr>
                            <td colSpan="8" className="mvls-no-data">
                                No data
                            </td>
                        </tr>
                    </tbody>
                )}
                {items.length > 0 && (
                    <tbody>
                        {items.map((item, index) => {
                            const {
                                id,
                                name,
                                price,
                                Review,
                                url,
                                Description,
                                image
                            } = item;

                            return (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td>{name}</td>
                                    <td>{price}</td>
                                    <td>{Review}</td>
                                    <td>{url}</td>
                                    <td>{Description}</td>
                                    <td>{image}</td>
                                    <td>
                                        <span
                                            className="mvls-table-link"
                                            onClick={onEditItem(item)}
                                        >
                                            Edit
                                        </span>
                                        &nbsp;&nbsp;|&nbsp;&nbsp;
                                        <span
                                            className="mvls-table-link"
                                            onClick={onDeleteItem(
                                                item,
                                                items
                                            )}
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default ItemTable;