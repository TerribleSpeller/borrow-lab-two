import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { database } from "./firebase"


// Your Firebase configuration
const db = database;

function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const equipmentRef = ref(db, 'labequipment');
    onValue(equipmentRef, (snapshot) => {
      const data = snapshot.val();
      const equipmentList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setEquipment(equipmentList);
    });
  }, []);

  
  const handleRequest = (item) => {
    router.push({
      pathname: '/request',
      query: { id: item.id, name: item.Name }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Lab Equipment</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Qty.</th>
            <th>Available Qty.</th>
            <th>Lab</th>
            <th>Request Equipment</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.Name}</td>
              <td>{item.Total}</td>
              <td>{item.Borrowed}</td>
              <td>{item.Lab}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleRequest(item)}>
                  Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Equipment;