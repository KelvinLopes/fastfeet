import Mail from '../../lib/Mail';

class TransportOrderCreateMail {
  get key() {
    return 'transportOrderCreateMail';
  }

  async handle({ data }) {
    const {
      deliverymanSearchId,
      recipientSearchId,
      deliveryOrder,
      product,
    } = data;

    await Mail.sendMail({
      to: `${deliverymanSearchId.name} <${deliverymanSearchId.email}>`,
      subject: 'Detalhes da nova entrega',
      template: 'transportOrderCreateMail',
      context: {
        id: deliveryOrder.id,
        deliveryman: deliverymanSearchId.name,
        product,
        recipient: recipientSearchId.name,
        street: recipientSearchId.street,
        number: recipientSearchId.number,
        complement_address: recipientSearchId.complement_address,
        city: recipientSearchId.city,
        state: recipientSearchId.state,
        zip_code: recipientSearchId.zip_code,
      },
    });
  }
}

export default new TransportOrderCreateMail();
