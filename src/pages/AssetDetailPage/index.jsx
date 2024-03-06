import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useParams } from "react-router-dom";

const AssetDetailsPage = () => {
  const { system_id } = useParams();
  const [assetDetails, setAssetDetails] = useState(null);

  useEffect(() => {
    const fetchAssetDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.saldo.com.ar/v3/systems/${system_id}`
        );
        console.log(response.data);
        setAssetDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching asset details:", error);
      }
    };

    fetchAssetDetails();
  }, [system_id]);

  if (!assetDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Modal isOpen={true} onRequestClose={() => {}}>
      <div>
        <h2>{assetDetails.attributes.name} Details</h2>
        <p>Price: {assetDetails.attributes.price}</p>
        {/* Other details you want to display */}
      </div>
    </Modal>
  );
};

export default AssetDetailsPage;
