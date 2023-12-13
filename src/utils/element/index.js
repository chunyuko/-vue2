import {
  Button,
  ButtonGroup,
  Header,
  Main,
  MessageBox,
  Message,
  Aside,
  Container,
  Menu,
  Scrollbar,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  DatePicker,
  Table,
  TableColumn,
  Pagination,
  Select,
  Input,
  Form,
  FormItem,
  Option,
  Upload,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  RadioGroup,
  Slider,
  Radio,
  Tree,
  TimePicker,
  progress,
  Popover,
  Dialog,
  Divider,
  Loading,
  RadioButton,
  Image,
  Checkbox,
  CheckboxGroup,
  Transfer,
  Cascader,
  Tag,
} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Radio)
    Vue.use(Button)
    Vue.use(ButtonGroup)
    Vue.use(Header)
    Vue.use(Main)
    Vue.use(Aside)
    Vue.use(Container)
    Vue.use(Menu)
    Vue.use(Scrollbar)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Pagination)
    Vue.use(RadioGroup)
    Vue.use(BreadcrumbItem)
    Vue.use(Upload)
    Vue.use(Badge)
    Vue.use(Input)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Slider)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Breadcrumb)
    Vue.use(Option)
    Vue.use(FormItem)
    Vue.use(Form)
    Vue.use(DatePicker)
    Vue.use(Tree)
    Vue.use(TimePicker)
    Vue.use(progress)
    Vue.use(Popover)
    Vue.use(Dialog)
    Vue.use(Divider)
    Vue.use(Loading.directive)
    Vue.use(RadioButton)
    Vue.use(Image)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Transfer)
    Vue.use(Cascader)
    Vue.use(Tag)

    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message
  },
}

export default element
