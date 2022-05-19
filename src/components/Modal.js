import React, {useState} from 'react'
import styles from './Modal.module.css'


const Modal = props => {
    const {type, edit, data} = props;
    const [name, setName] = useState(edit ? data.name : "");
    const [price, setPrice] = useState(edit ? data.price : "");
    const [warehouseId, setWarehouseId] = useState(edit ? data.warehouseId : 0)
    const [quantity, setQuantity] = useState(edit ? data.quantity : "")
    const [location, setLocation] = useState(edit ? data.location : "")
    const [error, setError] = useState(false);

    const onChangeName = (e) => {
        const newValue = e.target.value
        setName(newValue)
    }

    const onChangePrice = (e) => {
        const newValue = e.target.value
        setPrice(newValue)
    }

    const onChangeWarehouseId = (e) => {
        const newValue = e.target.value
        setWarehouseId(newValue)
    }

    const onChangeQuantity = (e) => {
        const newValue = e.target.value
        setQuantity(newValue)
    }

    const onChangeLocation = (e) => {
        const newValue = e.target.value
        setLocation(newValue)
    }

    const onClick = () => {
        if (type === "item") {
            if (!name || !price || !warehouseId || !quantity) {
                setError(true)
            } else {
                setError(false)
                if (edit)
                    props.onEdit({...data, name, price, warehouseId, quantity})
                else
                    props.onAdd({name, price, warehouseId, quantity})
            }

        } else {
            props.onAdd({name, location})
        }

    }

    return (
        <div className={styles.container} >
            <h2>{edit ? "Update" : "New"} {type === "item" ? "Item" : "Warehouse"}</h2>
            <div className={styles.section}>
                <label htmlFor="name">Name(*):</label>
                <input required={true} onChange={onChangeName} type="text" id="name" name="name" value={name} />
            </div>
            {type === "item" && (
                <div>
                    <div className={styles.section}>
                        <label htmlFor="price">Price(*):</label>
                        <input required={true} onChange={onChangePrice} min={0} type="number" id="price" name="price" value={price}/>
                    </div>
                    <div className={styles.section}>
                        <label htmlFor="warehouseId">Warehouse(*):</label>
                        <select required={true} onChange={onChangeWarehouseId} name="warehouseId" id="warehouseId" value={warehouseId}>
                            <option value="0">-- select a warehouse --</option>
                            {props.warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.name} - {warehouse.location}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.section}>
                        <label htmlFor="quantity">Quantity(*):</label>
                        <input required={true} onChange={onChangeQuantity} type="number" min="0" id="quantity" name="quantity" value={quantity}/>
                    </div>
                </div>
            )}
            {type === "warehouse" && (
                <div className={styles.section}>
                    <label htmlFor="location">Location(*):</label>
                    <input required={true} onChange={onChangeLocation} type="text" id="location" name="location" value={location} />
                </div>
            )}
            {error && <p>Please enter all required fields (*)</p>}
            <div>
                <button onClick={onClick} className={styles.button} type="submit">{edit ? "Update" : "Add"} {type === "item" ? "Item" : "Warehouse"}</button>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    )
}

export default Modal;
