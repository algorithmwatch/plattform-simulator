import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faTrashAlt,
  IconDefinition,
  faSlidersV,
} from '@fortawesome/pro-regular-svg-icons';
// import { faSlidersV } from '@fortawesome/pro-solid-svg-icons';
import { ForwardedRef, forwardRef, MouseEventHandler, ReactNode } from 'react';
import {
  Column as ColumnType,
  ColumnItem,
  useColumnStore,
  useUserPanelStore,
} from 'src/stores';

interface ColumnProps extends ColumnType {
  ref: any;
  items: ColumnItem[];
  hasPanel: boolean;
}

function Badge({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`flex items-center text-sm font-medium h-5 px-1 ${className}`}
    >
      {children}
    </span>
  );
}

function HeaderButton({
  icon,
  onClick,
  isActive,
}: {
  icon: IconDefinition;
  onClick: MouseEventHandler;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        isActive
          ? 'ring-2 ring-gray-900 bg-white'
          : 'bg-gray-300 hover:bg-gray-900 hover:text-white'
      } text-gray-900 text-xl rounded-full w-10 h-10 transition-all `}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
export const Column = forwardRef(
  (
    { id, name, items, hasPanel }: ColumnProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const removeColumn = useColumnStore((state) => state.remove);
    const addUserPanel = useUserPanelStore((state) => state.add);
    const removeUserPanelByColumnId = useUserPanelStore(
      (state) => state.removeByColumnId
    );

    return (
      <div className="w-full max-w-sm mx-2 -mt-20" ref={ref}>
        {/* head */}
        <div className="relative h-20 flex items-center justify-center">
          <h2 className="text-3xl font-bold">{name}</h2>
          <div className="flex items-center space-x-2 absolute right-0">
            <HeaderButton icon={faTrashAlt} onClick={() => removeColumn(id)} />
            <HeaderButton
              icon={faSlidersV}
              onClick={() =>
                hasPanel ? removeUserPanelByColumnId(id) : addUserPanel(id)
              }
              isActive={hasPanel}
            />
          </div>
        </div>
        {/* items */}
        {items.map(({ id: itemId, category, hasAd, age, fav }) => (
          <div
            key={itemId}
            className={`${category?.bgColor} flex items-center justify-between h-7 mb-0.5 px-1.5 text-white hover:bg-opacity-80`}
          >
            <div className="flex items-center">
              <div className="w-14">#{itemId}</div>
              <div className="w-9">
                {category && <FontAwesomeIcon icon={category.icon} />}
              </div>
              <div className="flex items-center">
                {age === 'today' && <Badge className="bg-blue-500">NEU</Badge>}
                {hasAd && <Badge className="bg-red-500">AD</Badge>}
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHeart} />
              <span className="ml-0.5 text-sm">{fav}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
);
