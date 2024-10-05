import { ResourceAction } from '@tur1/resources-vue'
import useUsersService from '@/pages/Users/services/useUsersService'

class DeleteAction extends ResourceAction {
  /**
   * The label of the action.
   * @type {string}
   */
  label = 'DeleteAction';

  /**
   * The icon of the action.
   * @type {string}
   */
  icon = '';

  /**
   * The CSS class for the action button.
   * @type {string}
   */
  class = '';

  /**
   * Whether the action requires confirmation.
   * @type {boolean}
   */
  confirmAction = false;
  /**
 * Whether the action requires delete.
 * @type {boolean}
 */
  deleteAction = false;
  /**
   * Handle the action. 
   */
 async handle({item, index}) {
    const {destroy} = useUsersService();
    await destroy(item, index)
  }
}

export default DeleteAction;
