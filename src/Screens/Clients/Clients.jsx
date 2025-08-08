import BigTable from '@/components/MyComponents/BigTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Pencil, UserRound, Building, Mail, Copy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import SimpleToast from '@/components/MyComponents/SimpleToast'

export default function Clients() {

  const columns = [
    {
      header: 'Tipo',
      accessorKey: 'customer_type',
      enableSorting: false,
      size: 70,
      cell: ({ row: { original } }) => (
        original.customer_type === 'INDIVIDUAL'
          ? <div className='flex gap-1 items-center text-sky-500'><UserRound className='w-5 h-5' /> Persona</div>
          : <div className='flex gap-1 items-center text-fuchsia-500'><Building className='w-5 h-5' /> Empresa</div>
      )
    },
    {
      header: 'Nombre',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        original.customer_details.first_name ?? original.customer_details.fantasy_name
      )
    },
    {
      header: 'Apellido',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        original.customer_details.first_surname ?? original.customer_details.company_name
      )
    },
    {
      header: 'Email',
      enableSorting: false,
      cell: ({ row: { original } }) => {
        const primaryContact = original.customer_contact.contact_methods.find(m => m.isPrimary)
        const email = primaryContact?.value
        const handleCopy = () => {
          if (email) {
            navigator.clipboard.writeText(email)
            toast(<SimpleToast message='Email copiado al portapapeles' state='success' />)
          }
        }
        return (
          <div className='flex gap-1 items-center'>
            <button type='button' title='Copiar email' onClick={handleCopy} className='hover:opacity-100 opacity-50 duration-300 outline-none hover:cursor-pointer'>
              <Copy className='w-4 h-4' />
            </button>
            <a title='Escribir email' href={`mailto:${email}`} className='hover:opacity-100 opacity-50 duration-300 outline-none hover:cursor-pointer p-1'>
              <Mail className='w-4 h-4'/>
            </a>
            <button type='button' title='Copiar email' onClick={handleCopy} className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1 underline'>
              {email}
            </button>
          </div>
        )
      }
    },
    {
      header: 'Acciones',
      enableSorting: false,
      size: 55,
      cell: ({ row: { original } }) => {

        const handleCopy = () => {
          if (original) {
            navigator.clipboard.writeText(JSON.stringify(original))
            toast(<SimpleToast message='Datos copiados al portapapeles' state='success' />)
          }
        }

        return (
          <div className='flex items-center gap-4 justify-end'>
            <Link className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' to={`/edit-client/${original.id}`}>
              <Pencil className='w-4 h-4' />
            </Link>

            <button onClick={handleCopy} title='Copiar todos los datos del cliente' className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1'>
              <Copy className='w-4 h-4' />
            </button>
          </div>
        )
      }
    }
  ]

  const data = [
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

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-4xl font-bold'>Clientes</h1>

        <Button className='font-bold' asChild>
          <Link to='/add-client'>
            <span className='hidden lg:inline-block'>Cargar Cliente</span>
            <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
          </Link>
        </Button>
      </header>

      <section className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
        <div className='flex justify-center mb-4 lg:mb-6'>
          <div className='w-1/2 max-w-[400px] relative flex items-center'>
            <Input type='text' placeHolder='Buscar' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div>
        </div>

        <BigTable
          columns={columns}
          data={data}
          // isLoading={isLoading || isRefetching}
          hoverRow
          // enableLazyLoad={!isRefetching && hasNextPage}
          // loadingLazyLoad={hasNextPage && isFetchingNextPage}
          // handleLazyLoad={fetchNextPage}
        />
      </section>
    </main>
  )
}
