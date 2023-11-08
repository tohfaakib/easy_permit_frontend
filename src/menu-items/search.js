// assets
import { SearchOutlined } from '@ant-design/icons';

// icons
const icons = {
  SearchOutlined
};

// ==============================|| MENU ITEMS - Search ||============================== //

const search = {
  id: 'group-search',
  title: 'Search',
  type: 'group',
  children: [
    {
      id: 'search',
      title: 'Search',
      type: 'item',
      url: '/search',
      icon: icons.SearchOutlined,
      breadcrumbs: false
    },
  ]
};

export default search;
