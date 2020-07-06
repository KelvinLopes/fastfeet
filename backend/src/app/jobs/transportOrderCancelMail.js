import Mail from '../../lib/Mail';

class TransportOrderCancelMail {
  get key() {
    return 'transportOrderCancelMail';
  }

  async handle({ data }) {
    const { toEmail } = data;

    await Mail.sendMail({
      to: `${toEmail.delivery_order.deliveryman.name}<${toEmail.delivery_order.deliveryman.email}>`,
      subject: `Cancelamento da entrega ${toEmail.delivery_order.id}`,
      template: 'transportOrderCancelMail',
      context: {
        deliveryman: toEmail.delivery_order.deliveryman.name,
        deliveryOrder_id: toEmail.delivery_order.id,
        product: toEmail.delivery_order.product,
        problem_description: toEmail.description,
        recipient: toEmail.delivery_order.recipient.name,
        street: toEmail.delivery_order.recipient.street,
        number: toEmail.delivery_order.recipient.number,
        complement_address: toEmail.delivery_order.recipient.complement_address,
        city: toEmail.delivery_order.recipient.state,
        state: toEmail.delivery_order.recipient.city,
        zip_code: toEmail.delivery_order.recipient.zip_code,
      },
    });
  }
}

export default new TransportOrderCancelMail();
