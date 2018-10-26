import { ItemsList, withDefaultProps } from '../../_lib'
import ItemsRow from './ItemsRow'
import ItemsRowView from './views/ItemsRowView'
import ItemsListView from './views/ItemsListView'

export default withDefaultProps({
  RenderComponent: ItemsListView,
  components: {
    ItemsRowComponent: ItemsRow,
    itemsRow: {
      RenderComponent: ItemsRowView
    }
  }
}, ItemsList)
