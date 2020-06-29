import Mail from '../../lib/Mail';

class TransportOrderCancelMail {
  get key() {
    return 'docTransportOrderCancelMail';
  }

  async handle({ data }) {
    const { deliveryOrder, delivery_problem } = data;

    await Mail.sendMail({
      to: `${deliveryOrder.deliveryman.name}<${deliveryOrder.deliveryman.email}>`,
      subject: 'Cancelamento de entrega',
      template: 'transportOrderCancelMail',
      context: {
        deliveryman: deliveryOrder.deliveryman.name,
        deliveryOrder_id: deliveryOrder.id,
        product: deliveryOrder.product,
        problem_description: delivery_problem.description,
      },
    });
  }
}

export default new TransportOrderCancelMail();
