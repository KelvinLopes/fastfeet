import Mail from '../../lib/Mail';

class TransportOrderUpdateMail {
  get key() {
    return 'transportOrderUpdateMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, deliveryOrder, product } = data;

    await Mail.sendMail({
      to: `${deliveryman} <${deliveryman.email}>`,
      subject: `Detalhes da atualização da entrega ${deliveryOrder.id}`,
      template: 'transportOrderUpdate',
      context: {
        id: deliveryOrder.id,
        deliveryman: deliveryman.name,
        product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement_address: recipient.complement_address,
        city: recipient.city,
        state: recipient.state,
        zip_code: recipient.zip_code,
      },
    });
  }
}

export default new TransportOrderUpdateMail();
