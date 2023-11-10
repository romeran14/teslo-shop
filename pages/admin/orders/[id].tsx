import { Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { AdminLayouts } from '@/components/layouts';
import { CartList, OrdenSummary } from '@/components/cart';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { IOrder } from '@/interfaces';

export type OrderResponseBody = {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED"
    | "CREATED"
};

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order


    return (
        <AdminLayouts title='Resumen de la orden' subTitle={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Orden: {order._id}</Typography>
            {
                order.isPaid ?
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label={'Orden ya fue pagada'}
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    ) : (
                        <Chip
                            sx={{ my: 2 }}
                            label={'Pendiente de pago'}
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }


            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({order.numberOfItems} productos)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            </Box>


                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address}{shippingAddress.address2 ? `${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city} - {shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrdenSummary
                                summary={{
                                    subTotal: order.subTotal,
                                    total: order.total,
                                    tax: order.tax,
                                    numberOfItems: order.numberOfItems,
                                }
                                } />

                            <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>

                                {
                                    order.isPaid ?
                                        (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label={'Orden ya fue pagada'}
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />
                                        ) : (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label={'Pendiente de pago'}
                                                variant='outlined'
                                                color='error'
                                                icon={<CreditCardOffOutlined />}
                                            />
                                        )
                                }
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </AdminLayouts>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dbOrders } from '@/database';


export const getServerSideProps: GetServerSideProps = async ({ req, query, res }) => {

    const { id = "" } = query
    const session: any = await getServerSession(req, res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString())

    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;