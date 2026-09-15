/**
 * Editable preset and variable naming library.
 * Each variable supports displayName, shortName, exportName, and mapLabel.
 */
const PRESET_TABLE_LIBRARY = [
  { name: 'Economic', items: [
    { id: 'median-household-income', label: 'Median Household Income', variables: [{ id: 'B19013_001E', displayName: 'Median Household Income Estimate', shortName: 'Median Household Income', exportName: 'median_household_income_estimate', mapLabel: 'Median Household Income Estimate ($)' }] },
    { id: 'per_capita_income', label: 'Per Capita Income', variables: [{ id: 'B19301_001E', displayName: 'Per Capita Income', shortName: 'Per Capita Income', exportName: 'per_capita_income', mapLabel: 'Per Capita Income ($)' }] },
    { id: 'median_home_value', label: 'Median Home Value', variables: [{ id: 'B25077_001E', displayName: 'Median Home Value', shortName: 'Median Home Value', exportName: 'median_home_value', mapLabel: 'Median Home Value ($)' }] },
    { id: 'median_gross_rent', label: 'Median Gross Rent', variables: [{ id: 'B25064_001E', displayName: 'Median Gross Rent', shortName: 'Median Gross Rent', exportName: 'median_gross_rent', mapLabel: 'Median Gross Rent ($)' }] },
    { id: 'civilian_labor_force', label: 'Civilian Labor Force Participation', variables: [
      { id: 'B23025_001E', displayName: 'Population Total', shortName: 'Population Total', exportName: 'population_total', mapLabel: 'Population Total' },
      { id: 'B23025_003E', displayName: 'Civilian Labor Force', shortName: 'Civilian Labor Force', exportName: 'civilian_labor_force', mapLabel: 'Civilian Labor Force' }
    ] },
    { id: 'population_below_poverty_level', label: 'Population Below Poverty Level', variables: [{ id: 'B17001_002E', displayName: 'Population Below Poverty Level', shortName: 'Population Below Poverty Level', exportName: 'population_below_poverty_level', mapLabel: 'Population Below Poverty Level' }] },
    { id: 'household_income_brackets', label: 'Household Income Brackets', variables: [
      { id: 'B19001_001E', displayName: 'Households Total', shortName: 'Households Total', exportName: 'households_total', mapLabel: 'Households Total' },
      { id: 'B19001_002E', displayName: 'Less than $10,000', shortName: 'Under $10K', exportName: 'household_income_less_than_10000', mapLabel: 'Household Income: Less than $10,000' },
      { id: 'B19001_003E', displayName: '$10,000 to $14,999', shortName: '$10K-$14,999', exportName: 'household_income_10000_to_14999', mapLabel: 'Household Income: $10,000 to $14,999' },
      { id: 'B19001_004E', displayName: '$15,000 to $19,999', shortName: '$15K-$19,999', exportName: 'household_income_15000_to_19999', mapLabel: 'Household Income: $15,000 to $19,999' },
      { id: 'B19001_005E', displayName: '$20,000 to $24,999', shortName: '$20K-$24,999', exportName: 'household_income_20000_to_24999', mapLabel: 'Household Income: $20,000 to $24,999' },
      { id: 'B19001_006E', displayName: '$25,000 to $29,999', shortName: '$25K-$29,999', exportName: 'household_income_25000_to_29999', mapLabel: 'Household Income: $25,000 to $29,999' },
      { id: 'B19001_007E', displayName: '$30,000 to $34,999', shortName: '$30K-$34,999', exportName: 'household_income_30000_to_34999', mapLabel: 'Household Income: $30,000 to $34,999' },
      { id: 'B19001_008E', displayName: '$35,000 to $39,999', shortName: '$35K-$39,999', exportName: 'household_income_35000_to_39999', mapLabel: 'Household Income: $35,000 to $39,999' },
      { id: 'B19001_009E', displayName: '$40,000 to $44,999', shortName: '$40K-$44,999', exportName: 'household_income_40000_to_44999', mapLabel: 'Household Income: $40,000 to $44,999' },
      { id: 'B19001_010E', displayName: '$45,000 to $49,999', shortName: '$45K-$49,999', exportName: 'household_income_45000_to_49999', mapLabel: 'Household Income: $45,000 to $49,999' },
      { id: 'B19001_011E', displayName: '$50,000 to $59,999', shortName: '$50K-$59,999', exportName: 'household_income_50000_to_59999', mapLabel: 'Household Income: $50,000 to $59,999' },
      { id: 'B19001_012E', displayName: '$60,000 to $74,999', shortName: '$60K-$74,999', exportName: 'household_income_60000_to_74999', mapLabel: 'Household Income: $60,000 to $74,999' },
      { id: 'B19001_013E', displayName: '$75,000 to $99,999', shortName: '$75K-$99,999', exportName: 'household_income_75000_to_99999', mapLabel: 'Household Income: $75,000 to $99,999' },
      { id: 'B19001_014E', displayName: '$100,000 to $124,999', shortName: '$100K-$124,999', exportName: 'household_income_100000_to_124999', mapLabel: 'Household Income: $100,000 to $124,999' },
      { id: 'B19001_015E', displayName: '$125,000 to $149,999', shortName: '$125K-$149,999', exportName: 'household_income_125000_to_149999', mapLabel: 'Household Income: $125,000 to $149,999' },
      { id: 'B19001_016E', displayName: '$150,000 to $199,999', shortName: '$150K-$199,999', exportName: 'household_income_150000_to_199999', mapLabel: 'Household Income: $150,000 to $199,999' },
      { id: 'B19001_017E', displayName: '$200,000 or more', shortName: '$200K+', exportName: 'household_income_200000_or_more', mapLabel: 'Household Income: $200,000 or More' }
    ] },
    { id: 'median_year_structure_built', label: 'Median Year Structure Built', variables: [{ id: 'B25035_001E', displayName: 'Median Year Structure Built', shortName: 'Median Year Structure Built', exportName: 'median_year_structure_built', mapLabel: 'Median Year Structure Built' }] },
    { id: 'rent_as_percentage_of_income', label: 'Rent as Percentage of Income', variables: [{ id: 'B25071_001E', displayName: 'Rent as Percentage of Income', shortName: 'Rent as Percentage of Income', exportName: 'rent_as_percentage_of_income', mapLabel: 'Rent as Percentage of Income' }] },
    { id: 'gini_index_of_income_inequality', label: 'Gini Index of Income Inequality', variables: [{ id: 'B19083_001E', displayName: 'Gini Index of Income Inequality', shortName: 'Gini Index of Income Inequality', exportName: 'gini_index_of_income_inequality', mapLabel: 'Gini Index of Income Inequality' }] },
  ] },
  { name: 'Transportation and Vehicles', items: [
    { id: 'commute-mode', label: 'Means of Transportation to Work', variables: [
      { id: 'B08301_001E', displayName: 'Workers Age 16 and Over', shortName: 'Workers 16+', exportName: 'workers_age_16_and_over', mapLabel: 'Workers Age 16 and Over' },
      { id: 'B08301_002E', displayName: 'Car, Truck, or Van', shortName: 'Car/Truck/Van', exportName: 'commute_car_truck_or_van', mapLabel: 'Car, Truck, or Van' },
      { id: 'B08301_003E', displayName: 'Drove Alone', shortName: 'Drove Alone', exportName: 'commute_drove_alone', mapLabel: 'Drove Alone' },
      { id: 'B08301_004E', displayName: 'Carpooled', shortName: 'Carpooled', exportName: 'commute_carpooled', mapLabel: 'Carpooled' },
      { id: 'B08301_010E', displayName: 'Public Transportation', shortName: 'Transit', exportName: 'commute_public_transportation', mapLabel: 'Public Transportation' },
      { id: 'B08301_016E', displayName: 'Taxicab', shortName: 'Taxi', exportName: 'commute_taxicab', mapLabel: 'Taxicab' },
      { id: 'B08301_017E', displayName: 'Motorcycle', shortName: 'Motorcycle', exportName: 'commute_motorcycle', mapLabel: 'Motorcycle' },
      { id: 'B08301_018E', displayName: 'Bicycle', shortName: 'Bicycle', exportName: 'commute_bicycle', mapLabel: 'Bicycle' },
      { id: 'B08301_019E', displayName: 'Walked', shortName: 'Walked', exportName: 'commute_walked', mapLabel: 'Walked' },
      { id: 'B08301_020E', displayName: 'Other Means', shortName: 'Other', exportName: 'commute_other_means', mapLabel: 'Other Means' },
      { id: 'B08301_021E', displayName: 'Worked From Home', shortName: 'WFH', exportName: 'commute_worked_from_home', mapLabel: 'Worked From Home' }
    ] },
    { id: 'travel-time', label: 'Travel Time to Work', variables: [
      { id: 'B08303_001E', displayName: 'Workers With Commute Time', shortName: 'Commute Total', exportName: 'commute_time_total', mapLabel: 'Workers With Commute Time' },
      { id: 'B08303_002E', displayName: 'Less Than 5 Minutes', shortName: 'Under 5 Min', exportName: 'commute_under_5_minutes', mapLabel: 'Less Than 5 Minutes' },
      { id: 'B08303_003E', displayName: '5 to 9 Minutes', shortName: '5-9 Min', exportName: 'commute_5_to_9_minutes', mapLabel: '5 to 9 Minutes' },
      { id: 'B08303_004E', displayName: '10 to 14 Minutes', shortName: '10-14 Min', exportName: 'commute_10_to_14_minutes', mapLabel: '10 to 14 Minutes' },
      { id: 'B08303_005E', displayName: '15 to 19 Minutes', shortName: '15-19 Min', exportName: 'commute_15_to_19_minutes', mapLabel: '15 to 19 Minutes' },
      { id: 'B08303_006E', displayName: '20 to 24 Minutes', shortName: '20-24 Min', exportName: 'commute_20_to_24_minutes', mapLabel: '20 to 24 Minutes' },
      { id: 'B08303_007E', displayName: '25 to 29 Minutes', shortName: '25-29 Min', exportName: 'commute_25_to_29_minutes', mapLabel: '25 to 29 Minutes' },
      { id: 'B08303_008E', displayName: '30 to 34 Minutes', shortName: '30-34 Min', exportName: 'commute_30_to_34_minutes', mapLabel: '30 to 34 Minutes' },
      { id: 'B08303_009E', displayName: '35 to 39 Minutes', shortName: '35-39 Min', exportName: 'commute_35_to_39_minutes', mapLabel: '35 to 39 Minutes' },
      { id: 'B08303_010E', displayName: '40 to 44 Minutes', shortName: '40-44 Min', exportName: 'commute_40_to_44_minutes', mapLabel: '40 to 44 Minutes' },
      { id: 'B08303_011E', displayName: '45 to 59 Minutes', shortName: '45-59 Min', exportName: 'commute_45_to_59_minutes', mapLabel: '45 to 59 Minutes' },
      { id: 'B08303_012E', displayName: '60 to 89 Minutes', shortName: '60-89 Min', exportName: 'commute_60_to_89_minutes', mapLabel: '60 to 89 Minutes' },
      { id: 'B08303_013E', displayName: '90 Minutes or More', shortName: '90+ Min', exportName: 'commute_90_minutes_or_more', mapLabel: '90 Minutes or More' }
    ] },
    { id: 'vehicle-availability', label: 'Household Vehicle Availability', variables: [
      { id: 'B08201_001E', displayName: 'Households Total', shortName: 'Households', exportName: 'vehicle_households_total', mapLabel: 'Households Total' },
      { id: 'B08201_002E', displayName: 'No Vehicles Available', shortName: 'Zero Vehicles', exportName: 'households_no_vehicles', mapLabel: 'No Vehicles Available' },
      { id: 'B08201_003E', displayName: 'One Vehicle Available', shortName: 'One Vehicle', exportName: 'households_one_vehicle', mapLabel: 'One Vehicle Available' },
      { id: 'B08201_004E', displayName: 'Two Vehicles Available', shortName: 'Two Vehicles', exportName: 'households_two_vehicles', mapLabel: 'Two Vehicles Available' },
      { id: 'B08201_005E', displayName: 'Three Vehicles Available', shortName: 'Three Vehicles', exportName: 'households_three_vehicles', mapLabel: 'Three Vehicles Available' },
      { id: 'B08201_006E', displayName: 'Four or More Vehicles Available', shortName: 'Four+ Vehicles', exportName: 'households_four_or_more_vehicles', mapLabel: 'Four or More Vehicles Available' }
    ] },
    { id: 'mean-travel-time', label: 'Mean Travel Time to Work', variables: [
      { id: 'B08013_001E', displayName: 'Aggregate Travel Time to Work', shortName: 'Aggregate Travel Time', exportName: 'aggregate_travel_time_minutes', mapLabel: 'Aggregate Travel Time to Work' },
      { id: 'B08006_001E', displayName: 'Workers With Transportation Data', shortName: 'Workers Total', exportName: 'workers_transportation_total', mapLabel: 'Workers With Transportation Data' }
    ] },
  ] },
  { name: 'Demographic', items: [
    { id: 'population-by-sex', label: 'Population by Sex', variables: [
      { id: 'B01001_001E', displayName: 'Total Population', shortName: 'Population', exportName: 'total_population', mapLabel: 'Total Population' },
      { id: 'B01001_002E', displayName: 'Male Population', shortName: 'Male', exportName: 'male_population', mapLabel: 'Male Population' },
      { id: 'B01001_026E', displayName: 'Female Population', shortName: 'Female', exportName: 'female_population', mapLabel: 'Female Population' }
    ] },
    { id: 'median-age', label: 'Median Age', variables: [
      { id: 'B01002_001E', displayName: 'Median Age', shortName: 'Median Age', exportName: 'median_age', mapLabel: 'Median Age' },
      { id: 'B01002_002E', displayName: 'Median Age Male', shortName: 'Male Median Age', exportName: 'median_age_male', mapLabel: 'Median Age Male' },
      { id: 'B01002_003E', displayName: 'Median Age Female', shortName: 'Female Median Age', exportName: 'median_age_female', mapLabel: 'Median Age Female' }
    ] },
    { id: 'race', label: 'Race', variables: [
      { id: 'B02001_001E', displayName: 'Population Total', shortName: 'Population', exportName: 'race_population_total', mapLabel: 'Population Total' },
      { id: 'B02001_002E', displayName: 'White Alone', shortName: 'White', exportName: 'race_white_alone', mapLabel: 'White Alone' },
      { id: 'B02001_003E', displayName: 'Black or African American Alone', shortName: 'Black', exportName: 'race_black_alone', mapLabel: 'Black or African American Alone' },
      { id: 'B02001_004E', displayName: 'American Indian and Alaska Native Alone', shortName: 'AIAN', exportName: 'race_aian_alone', mapLabel: 'American Indian and Alaska Native Alone' },
      { id: 'B02001_005E', displayName: 'Asian Alone', shortName: 'Asian', exportName: 'race_asian_alone', mapLabel: 'Asian Alone' },
      { id: 'B02001_006E', displayName: 'Native Hawaiian and Other Pacific Islander Alone', shortName: 'NHPI', exportName: 'race_nhpi_alone', mapLabel: 'Native Hawaiian and Other Pacific Islander Alone' },
      { id: 'B02001_007E', displayName: 'Some Other Race Alone', shortName: 'Other Race', exportName: 'race_other_alone', mapLabel: 'Some Other Race Alone' },
      { id: 'B02001_008E', displayName: 'Two or More Races', shortName: 'Multiracial', exportName: 'race_two_or_more', mapLabel: 'Two or More Races' }
    ] },
    { id: 'hispanic-origin', label: 'Hispanic or Latino Origin', variables: [
      { id: 'B03002_001E', displayName: 'Population Total', shortName: 'Population', exportName: 'ethnicity_population_total', mapLabel: 'Population Total' },
      { id: 'B03002_002E', displayName: 'Not Hispanic or Latino', shortName: 'Not Hispanic', exportName: 'not_hispanic_or_latino', mapLabel: 'Not Hispanic or Latino' },
      { id: 'B03002_012E', displayName: 'Hispanic or Latino', shortName: 'Hispanic', exportName: 'hispanic_or_latino', mapLabel: 'Hispanic or Latino' }
    ] },
    { id: 'educational-attainment', label: 'Educational Attainment Age 25 and Over', variables: [
      { id: 'B15003_001E', displayName: 'Population Age 25 and Over', shortName: 'Population 25+', exportName: 'education_population_25_and_over', mapLabel: 'Population Age 25 and Over' },
      { id: 'B15003_017E', displayName: 'Regular High School Diploma', shortName: 'HS Diploma', exportName: 'education_high_school_diploma', mapLabel: 'Regular High School Diploma' },
      { id: 'B15003_018E', displayName: 'GED or Alternative Credential', shortName: 'GED', exportName: 'education_ged', mapLabel: 'GED or Alternative Credential' },
      { id: 'B15003_019E', displayName: 'Some College Less Than 1 Year', shortName: 'Some College <1 Yr', exportName: 'education_some_college_under_1_year', mapLabel: 'Some College Less Than 1 Year' },
      { id: 'B15003_020E', displayName: 'Some College 1 or More Years No Degree', shortName: 'Some College 1+ Yr', exportName: 'education_some_college_1_plus_years', mapLabel: 'Some College 1 or More Years No Degree' },
      { id: 'B15003_021E', displayName: 'Associate Degree', shortName: 'Associate', exportName: 'education_associate_degree', mapLabel: 'Associate Degree' },
      { id: 'B15003_022E', displayName: 'Bachelor Degree', shortName: 'Bachelor', exportName: 'education_bachelors_degree', mapLabel: 'Bachelor Degree' },
      { id: 'B15003_023E', displayName: 'Master Degree', shortName: 'Master', exportName: 'education_masters_degree', mapLabel: 'Master Degree' },
      { id: 'B15003_024E', displayName: 'Professional School Degree', shortName: 'Professional', exportName: 'education_professional_degree', mapLabel: 'Professional School Degree' },
      { id: 'B15003_025E', displayName: 'Doctorate Degree', shortName: 'Doctorate', exportName: 'education_doctorate_degree', mapLabel: 'Doctorate Degree' }
    ] },
    { id: 'household-types', label: 'Household Types', variables: [
      { id: 'B11001_001E', displayName: 'Households Total', shortName: 'Households', exportName: 'households_total', mapLabel: 'Households Total' },
      { id: 'B11001_002E', displayName: 'Family Households', shortName: 'Family', exportName: 'family_households', mapLabel: 'Family Households' },
      { id: 'B11001_007E', displayName: 'Nonfamily Households', shortName: 'Nonfamily', exportName: 'nonfamily_households', mapLabel: 'Nonfamily Households' },
      { id: 'B11001_008E', displayName: 'Householder Living Alone', shortName: 'Living Alone', exportName: 'householder_living_alone', mapLabel: 'Householder Living Alone' }
    ] },
    { id: 'poverty-status', label: 'Poverty Status', variables: [
      { id: 'B17001_001E', displayName: 'Population With Poverty Status Determined', shortName: 'Poverty Universe', exportName: 'poverty_status_population', mapLabel: 'Population With Poverty Status Determined' },
      { id: 'B17001_002E', displayName: 'Population Below Poverty Level', shortName: 'Below Poverty', exportName: 'population_below_poverty_level', mapLabel: 'Population Below Poverty Level' }
    ] },
  ] },
  { name: 'Housing', items: [
    { id: 'housing-occupancy', label: 'Housing Occupancy', variables: [
      { id: 'B25001_001E', displayName: 'Housing Units Total', shortName: 'Housing Units', exportName: 'housing_units_total', mapLabel: 'Housing Units Total' },
      { id: 'B25002_001E', displayName: 'Housing Units With Occupancy Status', shortName: 'Occupancy Total', exportName: 'occupancy_status_total', mapLabel: 'Housing Units With Occupancy Status' },
      { id: 'B25002_002E', displayName: 'Occupied Housing Units', shortName: 'Occupied', exportName: 'occupied_housing_units', mapLabel: 'Occupied Housing Units' },
      { id: 'B25002_003E', displayName: 'Vacant Housing Units', shortName: 'Vacant', exportName: 'vacant_housing_units', mapLabel: 'Vacant Housing Units' }
    ] },
    { id: 'housing-tenure', label: 'Housing Tenure', variables: [
      { id: 'B25003_001E', displayName: 'Occupied Housing Units Total', shortName: 'Occupied Units', exportName: 'tenure_total', mapLabel: 'Occupied Housing Units Total' },
      { id: 'B25003_002E', displayName: 'Owner-Occupied Housing Units', shortName: 'Owner', exportName: 'owner_occupied_housing_units', mapLabel: 'Owner-Occupied Housing Units' },
      { id: 'B25003_003E', displayName: 'Renter-Occupied Housing Units', shortName: 'Renter', exportName: 'renter_occupied_housing_units', mapLabel: 'Renter-Occupied Housing Units' }
    ] },
    { id: 'vacancy-reason', label: 'Vacancy Reason', variables: [
      { id: 'B25004_001E', displayName: 'Vacant Housing Units Total', shortName: 'Vacant Units', exportName: 'vacant_units_total', mapLabel: 'Vacant Housing Units Total' },
      { id: 'B25004_002E', displayName: 'For Rent', shortName: 'For Rent', exportName: 'vacant_for_rent', mapLabel: 'For Rent' },
      { id: 'B25004_003E', displayName: 'Rented Not Occupied', shortName: 'Rented Not Occupied', exportName: 'vacant_rented_not_occupied', mapLabel: 'Rented Not Occupied' },
      { id: 'B25004_004E', displayName: 'For Sale Only', shortName: 'For Sale', exportName: 'vacant_for_sale', mapLabel: 'For Sale Only' },
      { id: 'B25004_005E', displayName: 'Sold Not Occupied', shortName: 'Sold Not Occupied', exportName: 'vacant_sold_not_occupied', mapLabel: 'Sold Not Occupied' },
      { id: 'B25004_006E', displayName: 'Seasonal Recreational or Occasional Use', shortName: 'Seasonal', exportName: 'vacant_seasonal', mapLabel: 'Seasonal Recreational or Occasional Use' },
      { id: 'B25004_007E', displayName: 'For Migrant Workers', shortName: 'Migrant Workers', exportName: 'vacant_migrant_workers', mapLabel: 'For Migrant Workers' },
      { id: 'B25004_008E', displayName: 'Other Vacant', shortName: 'Other Vacant', exportName: 'vacant_other', mapLabel: 'Other Vacant' }
    ] },
    { id: 'units-in-structure', label: 'Units in Structure', variables: [
      { id: 'B25024_001E', displayName: 'Housing Units Total', shortName: 'Housing Units', exportName: 'structure_units_total', mapLabel: 'Housing Units Total' },
      { id: 'B25024_002E', displayName: '1 Unit Detached', shortName: 'Detached', exportName: 'structure_1_unit_detached', mapLabel: '1 Unit Detached' },
      { id: 'B25024_003E', displayName: '1 Unit Attached', shortName: 'Attached', exportName: 'structure_1_unit_attached', mapLabel: '1 Unit Attached' },
      { id: 'B25024_004E', displayName: '2 Units', shortName: '2 Units', exportName: 'structure_2_units', mapLabel: '2 Units' },
      { id: 'B25024_005E', displayName: '3 or 4 Units', shortName: '3-4 Units', exportName: 'structure_3_or_4_units', mapLabel: '3 or 4 Units' },
      { id: 'B25024_006E', displayName: '5 to 9 Units', shortName: '5-9 Units', exportName: 'structure_5_to_9_units', mapLabel: '5 to 9 Units' },
      { id: 'B25024_007E', displayName: '10 to 19 Units', shortName: '10-19 Units', exportName: 'structure_10_to_19_units', mapLabel: '10 to 19 Units' },
      { id: 'B25024_008E', displayName: '20 to 49 Units', shortName: '20-49 Units', exportName: 'structure_20_to_49_units', mapLabel: '20 to 49 Units' },
      { id: 'B25024_009E', displayName: '50 or More Units', shortName: '50+ Units', exportName: 'structure_50_or_more_units', mapLabel: '50 or More Units' },
      { id: 'B25024_010E', displayName: 'Mobile Home', shortName: 'Mobile Home', exportName: 'structure_mobile_home', mapLabel: 'Mobile Home' },
      { id: 'B25024_011E', displayName: 'Boat RV Van or Similar', shortName: 'Other', exportName: 'structure_boat_rv_van', mapLabel: 'Boat RV Van or Similar' }
    ] },
    { id: 'housing-costs', label: 'Housing Costs', variables: [
      { id: 'B25077_001E', displayName: 'Median Home Value', shortName: 'Home Value', exportName: 'median_home_value', mapLabel: 'Median Home Value ($)' },
      { id: 'B25064_001E', displayName: 'Median Gross Rent', shortName: 'Gross Rent', exportName: 'median_gross_rent', mapLabel: 'Median Gross Rent ($)' },
      { id: 'B25035_001E', displayName: 'Median Year Structure Built', shortName: 'Year Built', exportName: 'median_year_structure_built', mapLabel: 'Median Year Structure Built' }
    ] },
    { id: 'rent-burden', label: 'Gross Rent as Percent of Household Income', variables: [
      { id: 'B25070_001E', displayName: 'Renter-Occupied Units Paying Cash Rent', shortName: 'Cash Rent Total', exportName: 'rent_burden_total', mapLabel: 'Renter-Occupied Units Paying Cash Rent' },
      { id: 'B25070_007E', displayName: '30.0 to 34.9 Percent', shortName: '30-34.9%', exportName: 'rent_burden_30_to_34_9_percent', mapLabel: '30.0 to 34.9 Percent' },
      { id: 'B25070_008E', displayName: '35.0 to 39.9 Percent', shortName: '35-39.9%', exportName: 'rent_burden_35_to_39_9_percent', mapLabel: '35.0 to 39.9 Percent' },
      { id: 'B25070_009E', displayName: '40.0 to 49.9 Percent', shortName: '40-49.9%', exportName: 'rent_burden_40_to_49_9_percent', mapLabel: '40.0 to 49.9 Percent' },
      { id: 'B25070_010E', displayName: '50.0 Percent or More', shortName: '50%+', exportName: 'rent_burden_50_percent_or_more', mapLabel: '50.0 Percent or More' },
      { id: 'B25070_011E', displayName: 'Not Computed', shortName: 'Not Computed', exportName: 'rent_burden_not_computed', mapLabel: 'Not Computed' }
    ] },
  ] },
];

function presetDefinitions(){return PRESET_TABLE_LIBRARY.flatMap(group=>group.items.map(item=>({...item,group:group.name})));}
function variableDefinitions(){return presetDefinitions().flatMap(item=>item.variables);}
function presetById(id){return presetDefinitions().find(item=>item.id===id);}
const variableMetadata=Object.fromEntries(variableDefinitions().map(item=>[item.id,item]));
function variableMeta(id){return variableMetadata[id]||{id,displayName:id,shortName:id,exportName:id,mapLabel:id};}
