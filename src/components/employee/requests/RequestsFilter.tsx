
import { OrderManagementFilter } from '@/components/employee/OrderManagementFilter'
import { FilterValues } from '@/types/orderManagement'
import { Request } from '@/types/request'
import { useState, useEffect } from 'react'

// Predefined list of Saudi Arabian cities in alphabetical order
const saudiCities = [
  "Abha",
  "Abqaiq",
  "Abu Arish",
  "Afif",
  "Ahad Rafidah",
  "Al Ardah",
  "Al Baha",
  "Al Badayea",
  "Al Bukayriyah",
  "Al Dayer",
  "Al Hanakiyah",
  "Al Hariq",
  "Al Hofuf",
  "Al Jubail",
  "Al Kharj",
  "Al Khafji",
  "Al Khurmah",
  "Al Lith",
  "Al Mahd",
  "Al Majma'ah",
  "Al Mubarraz",
  "Al Muzahimiyah",
  "Al Namas",
  "Al Qassim",
  "Al Qunfudhah",
  "Al Qurayyat",
  "Al Ula",
  "Al Wajh",
  "Al Zulfi",
  "Arar",
  "As Sulayyil",
  "Bariq",
  "Billasmar",
  "Bisha",
  "Buraidah",
  "Dammam",
  "Dawadmi",
  "Dhahran",
  "Diriyah",
  "Duba",
  "Hafar Al-Batin",
  "Hail",
  "Hotat Bani Tamim",
  "Jazan",
  "Jeddah",
  "Khamis Mushait",
  "Khobar",
  "Layla",
  "Mecca",
  "Medina",
  "Muhayil Asir",
  "Najran",
  "Qatif",
  "Rabigh",
  "Rafha",
  "Ranyah",
  "Riyadh",
  "Sabya",
  "Sakaka",
  "Samitah",
  "Sharurah",
  "Shaqra",
  "Tabuk",
  "Taif",
  "Tanomah",
  "Tayma",
  "Thadiq",
  "Turaif",
  "Turubah",
  "Unaizah",
  "Uyaynah",
  "Wadi ad-Dawasir",
  "Yanbu"
];

interface RequestsFilterProps {
  onFilterChange: (filters: FilterValues) => void
  serviceTypeValues: string[]
  statusValues: string[]
  requests: Request[]
}

export const RequestsFilter = ({ 
  onFilterChange, 
  serviceTypeValues, 
  statusValues,
  requests
}: RequestsFilterProps) => {
  // Use the predefined list of cities instead of extracting from requests
  const cities = saudiCities;
  
  // Handle filter submission
  const handleFilterSubmit = (filters: FilterValues) => {
    console.log("Filter submitted:", filters) // Debug log
    onFilterChange(filters)
  }
  
  // Handle filter changes
  const handleFilterChange = (filters: FilterValues) => {
    console.log("Filter changed:", filters) // Debug log
    onFilterChange(filters)
  }

  return (
    <OrderManagementFilter 
      onSubmit={handleFilterSubmit} 
      onFilterChange={handleFilterChange}
      serviceTypeValues={serviceTypeValues}
      statusValues={statusValues}
      cityValues={cities}
    />
  )
}

// Helper function to extract city from location string
const extractCityFromLocation = (location: string): string => {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}
