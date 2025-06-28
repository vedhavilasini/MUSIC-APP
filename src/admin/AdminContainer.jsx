import React from 'react'
import AdminContent from './AdminContent'
import AdminSidebar from './AdminSidebar'

const AdminContainer = () => {
    return (
        <div className='flex'>
             <AdminSidebar />
            <AdminContent />
        </div>
    )
}

export default AdminContainer