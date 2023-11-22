import NextLink from 'next/link';
import { Box, Card, CardContent, Divider, Grid, Typography, Chip, CircularProgress } from '@mui/material';
import { ShopLayouts } from '@/components/layouts';
import { CartList, OrdenSummary } from '@/components/cart';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { IOrder } from '@/interfaces';
import { PayPalButtons } from "@paypal/react-paypal-js";

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

    const router = useRouter();
    const { shippingAddress } = order
    const [isPaying, setIsPaying] = useState(false);

    const onOrderCompleted = async (details: OrderResponseBody) => {

        if (details.status !== 'COMPLETED') {
            return alert('No hay pago en Paypal');
        }

        setIsPaying(true);

        try {

            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            });
            console.log(data)
            router.reload();

        } catch (error) {
            setIsPaying(false);
            console.log(error);
            alert('Error');
        }

    }

    return (
        <ShopLayouts title='Resumen de la orden' pageDescription={'Resumen de la orden'}>
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

                                <Box display={isPaying ? 'flex' : 'none'} justifyContent={'center'} className='fadeIn' >
                                    <CircularProgress />
                                </Box>
                                <Box display={isPaying ? 'none' : 'flex'} flex={1} flexDirection={'column'} >
                                {
                                    order.isPaid ?
                                        (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label={'Orden ya fue pagada'}
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />)
                                        :
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: `${order.total}`,
                                                                // value: `${2019}`,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {

                                                return actions.order!.capture().then((details) => {

                                                    onOrderCompleted(details);
                                                    // console.log({ details  })
                                                    // const name = details.payer.name.given_name;
                                                    // alert(`Transaction completed by ${name}`);
                                                });
                                            }}
                                        />
                                }

                                </Box>  
                              
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayouts>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { dbOrders } from '@/database';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { tesloApi } from '@/axiosApi';


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
                destination: `/orders/history`,
                permanent: false
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
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