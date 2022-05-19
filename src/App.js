import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import Modal from "./components/Modal";

const environmentUrl = "localhost:8080"


function App() {

    const [items, setItems] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [type, setType] = useState("item")
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(null)

    const getAllItems = useCallback(async () => {
        const url = `http://${environmentUrl}/api/inventory/`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const resData = await response.json()
            return resData
        }
    }, [])

    const getAllWarehouses = useCallback(async () => {
        const url = `http://${environmentUrl}/api/warehouse/`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const resData = await response.json()
            return resData
        }
    }, [])

    useEffect(() => {
        getAllItems().then((res) => {
            if (res) {
                setItems(res.items)
            }
        })
        getAllWarehouses().then((res) => {
            if (res) {
                setWarehouses(res.warehouses)
            }
        })
    }, [getAllItems, getAllWarehouses])

    const addHandler = async (data) => {
        const url = `http://${environmentUrl}/api/${type === "item" ? "inventory" : "warehouse"}/add`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            getAllItems().then((res) => {
                if (res) {
                    setItems(res.items)
                    onCloseHandler()
                }
            })
            getAllWarehouses().then((res) => {
                if (res) {
                    setWarehouses(res.warehouses)
                    onCloseHandler()
                }
            })
        }
    }

    const onAddItem = () => {
        setEdit(false)
        setType("item")
        setModalVisible(true);
    }

    const onAddWarehouse = () => {
        setEdit(false)
        setType("warehouse")
        setModalVisible(true);
    }

    const onEditItem = (data) => {
        setEdit(true)
        setType("item")
        setData(data)
        setModalVisible(true)
    }

    const onCloseHandler = () => {
        setModalVisible(false);
    }

    const editHandler = async (data) => {
        const url = `http://${environmentUrl}/api/inventory/${data.id}/update`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            getAllItems().then((res) => {
                if (res) {
                    setItems(res.items)
                    onCloseHandler()
                }
            })
        }
    }

    const deleteHandler = async (data) => {
        const url = `http://${environmentUrl}/api/inventory/${data.id}/delete`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            getAllItems().then((res) => {
                if (res) {
                    setItems(res.items)
                    onCloseHandler()
                }
            })
        }
    }

    return (
        <div className="App">
            <div className="header">
                <h1>Inventory</h1>
                <button disabled={modalVisible} onClick={onAddItem}>Add Item</button>
            </div>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID Number:</th>
                        <th>Name:</th>
                        <th>Price:</th>
                        <th>Warehouse:</th>
                        <th>Stock:</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.warehouse}</td>
                            <td>{item.quantity}</td>
                            <td><button disabled={modalVisible} onClick={() => onEditItem(item)}>Edit</button></td>
                            <td><button disabled={modalVisible} onClick={() => deleteHandler(item)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="header">
                <h1>Warehouses</h1>
                <button disabled={modalVisible} onClick={onAddWarehouse}>Add Warehouse</button>
            </div>
            <table border="1">
                <thead>
                <tr>
                    <th>ID Number:</th>
                    <th>Name:</th>
                    <th>Location:</th>
                </tr>
                </thead>
                <tbody>
                {warehouses && warehouses.map(warehouse => (
                    <tr key={warehouse.id}>
                        <td>{warehouse.id}</td>
                        <td>{warehouse.name}</td>
                        <td>{warehouse.location}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {modalVisible && <Modal onAdd={addHandler} onEdit={editHandler} onClose={onCloseHandler} type={type} warehouses={warehouses} edit={edit} data={data} />}
        </div>
    );
}

export default App;
