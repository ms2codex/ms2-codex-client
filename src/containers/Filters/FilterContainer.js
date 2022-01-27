import React from 'react';
import FilterDropdown from '../../components/Filters/FilterDropdown'


const FilterContainer = (props) => {

  const tabs =
    [
      '', '-',
      'gear', 'outfit', 'mount',
      'catalyst', 'fishing_music', 'quest',
      'gemstone', 'misc', 'life_skill',
      'pets', 'consumable', 'currency',
      'badge', 'lapenshard', 'fragment',
    ]

  const jobs =
    [
      '-',
      'assassin',
      // 'berserker', doesn't seem to have data atm
      'heavy_gunner',
      'knight',
      'priest',
      'rune_blade',
      'soul_binder',
      'striker',
      'thief',
      'wizard'
    ]

    const slots =
    [
      '-',
      'NONE',
      'HR', //hair
      'CP', // helmet
      'CL', // shirt
      'GL', // gloves
      'PA', // pants
      'BE', // belt
      'SH', // shoe
      'RI', // ring
      'EA', // earrings
      'RH', // weapons
      'LH', // shield
      'MT', // cape
      'FA', // eye paint
      'PD', // face paint
      'OH', // weapons 2 of some sort
    ]
  return (
    <div className="settings-container" style={{}}>
      <div style={{ borderBottom: '1px solid #c2bfbf' }}>Filters</div>
      <FilterDropdown label={"Category"} options={tabs} tab={props.tab} onChange={props.handleTabSelect}></FilterDropdown>
      <FilterDropdown label={"Job"} options={jobs} tab={props.filteredJob} onChange={props.handleFilterChange}></FilterDropdown>
      <FilterDropdown label={"Slot"} options={slots} tab={props.slot} onChange={props.handleSlotChange}></FilterDropdown>
    </div>
  )
}

export default FilterContainer
