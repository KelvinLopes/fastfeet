import Mail from '../../lib/Mail';

class TransportOrderDeleteMail {
  get key() {
    return 'transportOrderDeleteMail';
  }

  async handle({ data }) {
    const { deliveryOrder } = data;

    await Mail.sendMail({
      to: `${deliveryOrder.deliveryman.name} <${deliveryOrder.deliveryman.email}>`,
      subject: `Cancelamento da entrega ${deliveryOrder.id} via FastFeet`,
      template: 'transportOrderDeleteMail',
      context: {
        id: deliveryOrder.id,
        deliveryman: deliveryOrder.deliveryman.name,
        product: deliveryOrder.product,
        recipient_name: deliveryOrder.recipient.name,
        recipient_street: deliveryOrder.recipient.street,
        recipient_number: deliveryOrder.recipient.number,
        recipient_complement_address:
          deliveryOrder.recipient.complement_address,
        recipient_city: deliveryOrder.recipient.city,
        recipient_state: deliveryOrder.recipient.state,
        recipient_zip_code: deliveryOrder.recipient.zip_code,
      },
    });
  }
}

export default new TransportOrderDeleteMail();
