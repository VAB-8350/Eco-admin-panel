

export function buildClient(data, addresses, contacts, primaryContact, shippingAddress, billingAddress, type) {
  return {
    ...parseClient(data, type),
    address: addresses.map(address => parseAddress(address, shippingAddress, billingAddress)),
    customer_contacts: contacts.map(contact => parseContact(contact, primaryContact)),
  }
}

export function parseClient(data, type) {
  const isPerson = type === 'INDIVIDUAL'
  return {
    customer_type: isPerson ? 'INDIVIDUAL' : 'BUSINESS',
    internal_notes: { metadata: data.note || '' },
    identification_type: isPerson ? 'AR_DNI' : 'AR_CUIT',
    identification_number: isPerson ? data.DNI : data.CUIT,
    customer_details: parseClientDetails(data, isPerson),
  }
}

export function parseClientDetails(data, isPerson) {
  return {
    company_name: !isPerson ? data.lastName : '',
    fantasy_name: !isPerson ? data.name : '',
    first_name: isPerson ? data.name : '',
    // second_name: 'Carlos',
    first_surname: isPerson ? data.lastName : '',
    // second_surname: 'Gómez',
    // birth_date: '1980-01-01'
  }
}

export function parseAddress(address, shippingAddress, billingAddress) {
  return {
    address_type: address.place,
    street: address.address,
    city: address.city,
    state_province: address.region,
    zip_code: address.zip,
    country_code: address.country,
    additional_info: address.dpto || '',
    is_primary: address.shippingAddress || (address.id === shippingAddress),
    is_primary_shipping: address.shippingAddress || (address.id === shippingAddress),
    is_primary_billing: address.billingAddress || (address.id === billingAddress),
    internal_notes: { metadata: address.note || '' },
  }
}

export function parseContact(contact, primaryContact) {
  return {
    contact_type: contact.type,
    first_name: contact.firstName,
    last_name: contact.lastName,
    role: contact.role,
    is_primary: contact.id === primaryContact,
    internal_notes: contact.internalNotes,
    contact_methods: contact.contactMethods.map(cm => parseContactMethod(cm)),
  }
}

export function parseContactMethod(cm) {
  return {
    id: cm.id,
    type: cm.type,
    value: cm.value,
    is_primary: cm.primary,
  }
}