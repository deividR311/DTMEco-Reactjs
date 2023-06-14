import React from 'react'
import BreadCrumb from './components/BreadCrumbs';
import GridConten from './components/CreateRecipient'
import DashboardRecipient from './components/DashboardRecipients';

const Recipients = () => {
  return (
    <>
      <div>
        <BreadCrumb />
        <section className="container">
          {/* <GridConten /> */}
          {/* <DashboardRecipient /> */}
        </section>
      </div>
    </>
  )
}

export default Recipients;