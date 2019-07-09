const options = [

  {
    key: 'calendar',
    label: 'sidebar.calendar',
    leftIcon: 'ion-calendar',
  },
  {
    key:'mainsettings',
    label:'sidebar.settings',
    leftIcon:'ion-ios-settings',
    children:[
      {
        key:'settings',
        label:'sidebar.general'
      }
    ]
  },
  {
    key:'images',
    label:'sidebar.images',
    leftIcon:'ion-images'
  },
  {
    key: 'notes',
    label: 'sidebar.notes',
    leftIcon: 'ion-ios-paper',
  },
  {
    key:'prereg',
    label:'sidebar.prereg',
    leftIcon:'ion-person-add'
  },
  {
    key: 'notifications',
    label: 'sidebar.todos',
    leftIcon: 'ion-android-checkbox-outline',
  },
  {
    key:'features',
    label:'sidebar.features',
    leftIcon:'ion-android-apps',
    children:[
      {
        key:'features/desc',
        label:'sidebar.description'
      }
    ]
  },
  {
    key:'car',
    label:'sidebar.car',
    leftIcon:'ion-android-car',
    children:[
      {
        key:'car/add',
        label:'sidebar.add',
        leftIcon:'ion-plus'
      },
      {
        key:'car/list',
        label:'sidebar.list',
        leftIcon:'ion-android-list'
      }
    ]
  },
 
  {
    key: 'contacts',
    label: 'sidebar.contacts',
    leftIcon: 'ion-android-person-add',
  }
];
export default options;
