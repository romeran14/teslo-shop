import { SummaryTile } from "@/components/admin"
import { AdminLayouts } from "@/components/layouts"
import { DashboardSummaryResponse } from "@/interfaces"
import { AccessAlarmOutlined, AttachMoneyOutlined, AttachmentOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material"
import { Card, CardContent, Grid, Typography } from "@mui/material"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import useSWR from "swr"


const DashBoardPage: NextPage = () => {

  const { data,error } = useSWR<DashboardSummaryResponse>("/api/admin/dashboard",{
    refreshInterval: 30 * 1000
  })

  // const [refresIn, setrefresIn] = useState(30)

  // useEffect(() => {
  //   const interval = setInterval(()=>{
  //     console.log('tick')
  //     setrefresIn( refresIn => refresIn > 0? refresIn - 1 : 30)
  //   })

  //   return ()=> clearInterval(interval)
   
  // }, [])
  

  if ( !error && !data) {
    return <></>
  }

  if ( error ) {
    console.log(error)
    return <Typography>Error al cargar la informacion</Typography>
  }

  const { 
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
    notPaidOrders
   } = data!;

  return (
    <AdminLayouts
      title="DashBoard"
      subTitle="Estadisticas generakes"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={ numberOfOrders }
          subTitle={"Ordenes totales"}
          icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={ paidOrders }
          subTitle={"Ordenes pagadas"}
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={ notPaidOrders }
          subTitle={"Ordenes pendientes"}
          icon={<GroupOutlined color="error" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={ numberOfClients }
          subTitle={"Clientes"}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={ numberOfProducts }
          subTitle={"Productos"}
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={ productsWithNoInventory }
          subTitle={"Sin existencia"}
          icon={<CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />} />
        <SummaryTile
          title={ lowInventory }
          subTitle={"Bajo inventario"}
          icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />} />

        <SummaryTile
          title={ 8 }
          subTitle={"Actualizacion en:"}
          icon={<AccessAlarmOutlined color="error" sx={{ fontSize: 40 }} />} />
      </Grid>
    </AdminLayouts>
  )
}

export default DashBoardPage