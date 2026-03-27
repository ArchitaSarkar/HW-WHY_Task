import React, { useEffect, useState } from 'react';
// We keep the import here just to check it in the console
import DataTable from 'react-data-table-component'; 
import API from '../api/axios';

const Dashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    // DEBUG: This will tell us exactly what Vite is importing
    console.log("DEBUG: Value of DataTable is:", DataTable);
    console.log("DEBUG: Type of DataTable is:", typeof DataTable);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const res = await API.get('/teachers');
                const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
                setTeachers(data);
            } catch (err) {
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    if (loading) return <div>Loading Teachers...</div>;

    return (
        <div style={{ padding: '40px', background: '#fff', color: '#000' }}>
            <h2>Teacher Directory (Debug Mode)</h2>
            
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>University</th>
                        <th>Year Joined</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map((t, index) => (
                        <tr key={index}>
                            <td>{t.first_name}</td>
                            <td>{t.last_name}</td>
                            <td>{t.email}</td>
                            <td>{t.university_name}</td>
                            <td>{t.year_joined}</td>
                            <td>{t.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button 
                onClick={() => { localStorage.clear(); window.location.href='/login'; }}
                style={{ marginTop: '20px', padding: '10px' }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;