// Schema Markup Generator for Real Estate Rich Snippets
// Optimized for Google Search Results with price, bedrooms, location, and ratings

export function generateRealEstateSchema(_property) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dr. Jan Duffy',
    description:
      'Lone Mountain Heights Real Estate Expert - 500+ Las Vegas Transactions',
    url: 'https://lonemountainheights.com',
    telephone: '+1-702-222-1964',
    email: 'jan@lonemountainheights.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lone Mountain Heights',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89134',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: 'Las Vegas',
      containedInPlace: {
        '@type': 'State',
        name: 'Nevada',
      },
    },
    serviceType: 'Real Estate Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Lone Mountain Heights Real Estate Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Sales',
            description:
              'Expert real estate services for selling homes in Lone Mountain Heights',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Purchases',
            description:
              'Professional assistance buying homes in Lone Mountain Heights',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Valuation',
            description: 'Instant home value estimates with market analysis',
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generatePropertySchema(property) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.address,
    description: `${property.bedrooms} bedroom, ${property.bathrooms} bathroom home in Lone Mountain Heights`,
    url: `https://lonemountainheights.com/homes/${property.id}`,
    image: property.image,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89134',
      addressCountry: 'US',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.sqft,
      unitCode: 'SQF',
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    numberOfBedrooms: property.bedrooms,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Lot Size',
        value: property.lotSize,
      },
      {
        '@type': 'PropertyValue',
        name: 'Home Style',
        value: property.homeStyle,
      },
      {
        '@type': 'PropertyValue',
        name: 'Year Built',
        value: property.yearBuilt,
      },
      {
        '@type': 'PropertyValue',
        name: 'Garage Spaces',
        value: property.garage,
      },
    ],
    amenityFeature: property.pool
      ? [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Swimming Pool',
            value: true,
          },
        ]
      : [],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.1699',
      longitude: '-115.1398',
    },
    provider: {
      '@type': 'RealEstateAgent',
      name: 'Dr. Jan Duffy',
      telephone: '+1-702-222-1964',
      email: 'jan@lonemountainheights.com',
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dr. Jan Duffy - Lone Mountain Heights Real Estate Expert',
    description:
      'Premier real estate services in Lone Mountain Heights, Las Vegas. Your complete real estate partner with deep neighborhood expertise.',
    url: 'https://lonemountainheights.com',
    telephone: '+1-702-222-1964',
    email: 'jan@lonemountainheights.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lone Mountain Heights',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89134',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.1699',
      longitude: '-115.1398',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Las Vegas',
      },
      {
        '@type': 'Place',
        name: 'Lone Mountain Heights',
      },
    ],
    serviceType: 'Real Estate Services',
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00,Sa 10:00-16:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody:
          'Dr. Jan knew exactly which street would give us the best resale value. Sold our home in 8 days for $15K over asking!',
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Mike Chen',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody:
          'Her knowledge of Lone Mountain Heights is unmatched. Found us the perfect home with mountain views.',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Real Estate Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Sales',
            description:
              'Expert real estate services for selling homes in Lone Mountain Heights',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Purchases',
            description:
              'Professional assistance buying homes in Lone Mountain Heights',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Home Valuation',
            description: 'Instant home value estimates with market analysis',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Market Reports',
            description:
              'Monthly market analysis and trends for Lone Mountain Heights',
          },
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Real Estate specific FAQ data
export const realEstateFAQs = [
  {
    question: 'What is the average home price in Lone Mountain Heights?',
    answer:
      'The average home price in Lone Mountain Heights is currently $847,000, with prices ranging from $680,000 to $950,000 depending on size, location, and features.',
  },
  {
    question:
      'How long do homes typically stay on the market in Lone Mountain Heights?',
    answer:
      'Homes in Lone Mountain Heights typically sell within 12 days on average, which is faster than the Las Vegas metro average of 20 days.',
  },
  {
    question: 'What are the best streets in Lone Mountain Heights?',
    answer:
      'The most desirable streets include Mountain Ridge Dr (mountain views, larger lots), Desert View Ln (great value, updated homes), and Canyon Heights Blvd (quiet cul-de-sac, family-friendly).',
  },
  {
    question: 'What schools serve the Lone Mountain Heights area?',
    answer:
      'Lone Mountain Elementary (K-5), Desert Ridge Middle School (6-8), and Shadow Ridge High School (9-12) serve the area, all with excellent ratings of 8-9/10.',
  },
  {
    question: 'Is Lone Mountain Heights a good investment?',
    answer:
      'Yes, Lone Mountain Heights offers strong investment potential with 5.2% price appreciation year-over-year, low inventory (2.1 months supply), and high demand from buyers seeking quality homes in established neighborhoods.',
  },
];
