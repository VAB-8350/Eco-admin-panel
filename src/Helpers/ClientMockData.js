export const data = [
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 67890,
    'customer_type': 'BUSINESS',
    'customer_details': {
      'company_name': 'Laboratorios Farmacéuticos del Sur S.A.',
      'fantasy_name': 'FarmaSur'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente corporativo con descuentos especiales. Facturación mensual consolidada.'
    },
    'identification_type': 'AR_CUIT',
    'identification_number': '30-12345678-9',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'WORK',
      'street': 'Av. Santa Fe 2456, Oficina 1205',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1123AAF',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'EMPLOYEE',
      'first_name': 'María Laura',
      'last_name': 'Rodríguez',
      'role': 'Gerente de Compras',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Contacto principal para órdenes de compra. Disponible lunes a viernes 9-18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'compras@farmasur.com.ar',
          'isPrimary': true
        },
        {
          'type': 'PHONE_WORK',
          'value': '+54 11 4567-8901',
          'isPrimary': false
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 9876-5432',
          'isPrimary': false
        }
      ]
    }
  },
  {
    'customer_code': 12345,
    'customer_type': 'INDIVIDUAL',
    'customer_details': {
      'first_name': 'Juan Carlos',
      'second_name': 'Eduardo',
      'first_surname': 'Pérez',
      'second_surname': 'González',
      'birth_date': '1985-03-15'
    },
    'vat_exempt': false,
    'internal_notes': {
      'metadata': 'Cliente preferencial, atención especial en horarios de mañana'
    },
    'identification_type': 'AR_DNI',
    'identification_number': '12.345.678',
    'default_language': 'es_AR',
    'address': {
      'address_type': 'HOME',
      'street': 'Av. Corrientes 1234, Piso 5, Depto B',
      'city': 'Buenos Aires',
      'state_province': 'Ciudad Autónoma de Buenos Aires',
      'zip_code': 'C1043AAZ',
      'country_code': 'AR',
      'is_primary': true
    },
    'customer_contact': {
      'contact_type': 'OTHER',
      'first_name': 'Juan Carlos',
      'last_name': 'Pérez González',
      'role': 'Titular',
      'is_main_contact': true,
      'internal_notes': {
        'metadata': 'Prefiere contacto por WhatsApp después de las 18hs'
      },
      'contact_methods': [
        {
          'type': 'EMAIL',
          'value': 'juan.perez@email.com',
          'isPrimary': true
        },
        {
          'type': 'PHONE_PERSONAL',
          'value': '+54 11 1234-5678',
          'isPrimary': false
        },
        {
          'type': 'WHATSAPP',
          'value': '+54 9 11 1234-5678',
          'isPrimary': false
        }
      ]
    }
  },
]