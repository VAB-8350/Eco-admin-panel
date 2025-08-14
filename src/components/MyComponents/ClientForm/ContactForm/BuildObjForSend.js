export function buildClient(data, addresses, contacts, primaryContact, shippingAddress, billingAddress, ) {

  const isPerson = !!data.DNI

  const body = {
    customer_type: isPerson ? 'INDIVIDUAL' : 'BUSINESS',
    internal_notes: { metadata: data.note || '' },
    identification_type: isPerson ? 'AR_DNI' : 'AR_CUIT',
    identification_number: data.DNI || data.CUIT,
    customer_details: {
      company_name: !isPerson ? data.lastName : '',
      fantasy_name: !isPerson ? data.name : '',
      first_name: isPerson ? data.name : '',
      // second_name: 'Carlos',
      first_surname: isPerson ? data.lastName : '',
      // second_surname: 'Gómez',
      // birth_date: '1980-01-01'
    },
    address: addresses.map(address => {
      return {
        address_type: address.place,
        street: address.address,
        city: address.city,
        state_province: address.region,
        zip_code: address.zip,
        country_code: address.country,
        additional_info: address.depto || '',
        is_primary: address.id === shippingAddress,
        internal_notes: { metadata: address.note || '' },
      }
    }),
    customer_contacts: contacts.map(contact => {
      return {
        contact_type: contact.type,
        first_name: contact.firstName,
        last_name: contact.lastName,
        role: contact.role,
        is_primary: contact.id === primaryContact,
        internal_notes: contact.internalNotes,
        contact_methods: contact.contactMethods.map(cm => {
          return {
            type: cm.type,
            value: cm.value,
            is_primary: cm.primary,
          }
        })
      }
    })
  }

  return body
}

export function modifyClientData(original, updated) {

  // Parse original info like updated
  const originalParsed = parsedOriginalObj(original)
  const differences = getDifferences(originalParsed, updated)

  // clean client object
  const clientDif = { ...differences, customer_id: differences?.id }
  delete clientDif.customer_contacts
  delete clientDif.address
  delete clientDif.id

  // clean customer contacts
  const contactsDif = differences?.customer_contacts
  // clean address
  const addressDif = differences?.address

  return {
    clientDif,
    contactsDif,
    addressDif
    // Los arrays de eliminados deben ser gestionados y pasados desde el frontend
  }
}

function parsedOriginalObj(original) {
  const originalIsPerson = !!original.DNI

  const originalParsed = {
    id: original.id,
    customer_type: original.type,
    internal_notes: { metadata: original.note },
    identification_type: originalIsPerson ? 'AR_DNI' : 'AR_CUIT',
    identification_number: original.DNI || original.CUIT,
    customer_details: {
      company_name: !originalIsPerson ? original.lastName : '',
      fantasy_name: !originalIsPerson ? original.name : '',
      first_name: originalIsPerson ? original.name : '',
      // second_name: 'Carlos',
      first_surname: originalIsPerson ? original.lastName : '',
      // second_surname: 'Gómez',
      // birth_date: '1980-01-01'
    },
    address: original.addresses.map(address => {
      return {
        id: address.id,
        address_type: address.place,
        street: address.address,
        city: address.city,
        state_province: address.region,
        zip_code: address.zip,
        country_code: address.country,
        additional_info: address.depto || '',
        is_primary: address.isPrimary,
        internal_notes: { metadata: address.note || '' },
      }
    }),
    customer_contacts: original.contacts.map(contact => {
      return {
        id: contact.id,
        contact_type: contact.type,
        first_name: contact.firstName,
        last_name: contact.lastName,
        role: contact.role,
        is_primary: contact.primary,
        internal_notes: contact.internalNotes,
        contact_methods: contact.contactMethods.map(cm => {
          return {
            id: cm.id,
            type: cm.type,
            value: cm.value,
            is_primary: cm.primary,
          }
        })
      }
    })
  }

  return originalParsed
}

function getDifferences(obj1, obj2, rootId = obj1?.id) {
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return obj1 !== obj2 ? obj2 : undefined
  }
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const diffs = []
    for (let i = 0; i < Math.max(obj1.length, obj2.length); i++) {
      const id = obj1[i]?.id || obj2[i]?.id
      // Special case for contact_methods: if any change, return full object
      if (rootId && Array.isArray(obj1) && Array.isArray(obj2) && rootId === 'contact_methods') {
        // Compare all fields except 'id'
        const omitId = obj => {
          if (!obj) return obj
          const { id, ...rest } = obj
          return rest
        }
        if (JSON.stringify(omitId(obj1[i])) !== JSON.stringify(omitId(obj2[i]))) {
          // Preserve id from original if present, but don't treat id change as a diff
          if (obj1[i]?.id) {
            diffs[i] = { ...obj2[i], id: obj1[i].id }
          } else {
            diffs[i] = obj2[i]
          }
        }
        continue
      }
      const diff = getDifferences(obj1[i], obj2[i], id)
      if (diff !== undefined) {
        if (id) {
          diffs[i] = { id, ...diff }
        } else {
          diffs[i] = diff
        }
      }
    }
    return diffs.length ? diffs : undefined
  }
  const diffs = {}
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  keys.forEach(key => {
    let value1 = obj1[key]
    let value2 = obj2[key]
    // If the key is 'contact_methods' and both are arrays, compare and return full object if changed
    if (key === 'contact_methods' && Array.isArray(value1) && Array.isArray(value2)) {
      // Compare all fields except 'id'
      const omitIdArr = arr => arr.map(cm => {
        if (!cm) return cm
        const { id, ...rest } = cm
        return rest
      })
      const sorted1 = omitIdArr([...value1].sort((a, b) => (a.type || '').localeCompare(b.type || '')))
      const sorted2 = omitIdArr([...value2].sort((a, b) => (a.type || '').localeCompare(b.type || '')))
      if (JSON.stringify(sorted1) !== JSON.stringify(sorted2)) {
        // Preserve ids from original if missing in updated, but don't treat id change as a diff
        const merged = value2.map((cm, idx) => {
          if (!cm.id && value1[idx]?.id) {
            return { ...cm, id: value1[idx].id }
          }
          return cm
        })
        diffs[key] = merged
      }
      return
    }
    const id = value1?.id || value2?.id
    const diff = getDifferences(value1, value2, id)
    if (diff !== undefined) {
      if (typeof diff === 'object' && !Array.isArray(diff) && diff !== null && id && !diff.id) {
        diffs[key] = { id, ...diff }
      } else {
        diffs[key] = diff
      }
    }
  })

  if (Object.keys(diffs).length) {
    if (rootId && !diffs.id && obj1?.id) {
      diffs.id = rootId
    }
    return diffs
  }
  return undefined
}