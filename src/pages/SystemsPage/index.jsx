import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Button, ListGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../src/SystemsPage.css";

const SystemsPage = ({ handleLogout }) => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("https://api.saldo.com.ar/v3/systems");
        setAssets(response.data.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const openModal = async (id) => {
    try {
      const response = await axios.get(
        `https://api.saldo.com.ar/v3/systems/${id}`
      );
      setSelectedAsset(response.data.data);

      const response2 = await axios.get(
        `https://api.saldo.com.ar/json/rates/${id}`
      );
      setExchangeRates(response2.data);
    } catch (error) {
      console.error("Error fetching asset details:", error);
    }
  };

  const closeModal = () => {
    setSelectedAsset(null);
    setExchangeRates({});
  };

  return (
    <div className="container mt-5">
      <h2>Systems</h2>
      <p>Lista de activos disponibles:</p>
      <ListGroup>
        {assets.map((asset, index) => (
          <ListGroup.Item key={index} className="list-item-hover">
            <Row>
              <Col>
                <div>
                  <p>{asset.attributes.name}</p>
                  <p>{asset.attributes.description}</p>
                </div>
              </Col>
              <Col xs="auto">
                <Button onClick={() => openModal(asset.id)}>
                  Ver detalles
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="mt-3">
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>

      <Modal
        isOpen={!!selectedAsset}
        onRequestClose={closeModal}
        contentLabel="Asset Details"
      >
        {selectedAsset && (
          <div>
            <h2>{selectedAsset.attributes.name} Details</h2>
            <p>Price: {selectedAsset.attributes.price}</p>
            <p>Currency: {selectedAsset.attributes.currency}</p>
            <p>Trend: {selectedAsset.attributes.trend}</p>
            <h3>Exchange Rates</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Bid</th>
                  <th>Ask</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(exchangeRates).map((currency, index) => (
                  <tr key={index}>
                    <td>{currency}</td>
                    <td>{exchangeRates[currency].bid}</td>
                    <td>{exchangeRates[currency].ask}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button onClick={closeModal}>Cerrar</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SystemsPage;
