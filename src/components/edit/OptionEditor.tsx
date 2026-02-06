import { memo, ReactNode, useState } from "react";
import { QuestionType } from "../../types/app";
import Input from "../common/Input";
import RadioIcon from '../../assets/icons/radio_button_unchecked.svg?react';
import CheckboxIcon from '../../assets/icons/check_box_outline_blank.svg?react';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import { GripVerticalIcon } from 'lucide-react';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

interface OptionEditorProps {
    //type: 'multipleChoice' | 'checkbox' | 'dropdown';
    type: QuestionType
}

type Option = {
  id: string;
  value: string;
};

interface SortableItemProps {
  id: string;
  children: ReactNode;
}

interface OptionRowProps {
  option: Option;
  type: QuestionType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

export default function OptionEditor({ type }: OptionEditorProps) {
    const [options, setOptions] = useState<Option[]>([]);
    const [activeOption, setActiveOption] = useState<Option | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
            distance: 6,
            },
        })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setOptions(prev => {
            const oldIndex = prev.findIndex(o => o.id === active.id);
            const newIndex = prev.findIndex(o => o.id === over.id);
            return arrayMove(prev, oldIndex, newIndex);
        });
        setActiveOption(null);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        setOptions(prev => prev.map(o => (o.id === id ? { ...o, value: e.target.value } : o)));
    };

    return (
        <div>
            <DndContext
                sensors={sensors}
                modifiers={[
                            restrictToVerticalAxis,
                            restrictToParentElement,
                          ]}
                onDragStart={e => {
                    const id = e.active.id as string;
                    setActiveOption(options.find(o => o.id === id) ?? null);
                }}
                onDragEnd={ handleDragEnd }
                onDragCancel={() => { setActiveOption(null) }}
                >
                <SortableContext
                    items={options.map(o => o.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {options.map(option => (
                    <SortableItem 
                      key={option.id}
                      id={option.id}>
                        <OptionRow option={option} type={type} onChange={handleInputChange}  />
                    </SortableItem>
                    ))}
                </SortableContext>
                <DragOverlay>
                    {activeOption ? (
                        <div className="opacity-80 shadow-lg bg-white rounded-md">
                        <OptionRow option={activeOption} type={type} />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
            <div className="flex items-center mt-28">
             {icons[type]}
            <button 
                className="text-gray-500 text-16"
                onClick={() => {
                    setOptions(prv => [...prv, {id: crypto.randomUUID(), value: ''}]);
                }}
            >
                옵션추가</button>
            </div>
        </div>
    );
}

const icons: Partial<Record<QuestionType, ReactNode>> = {
    'multipleChoice': <RadioIcon className="mr-14" />,
    'checkbox': <CheckboxIcon className="mr-14" />,
    'dropdown': <RadioIcon className="mr-14" />
}

const SortableItem = memo(function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform) }}
      className="flex items-center transition-transform"
      {...attributes}
    >
      {/* 드래그 핸들 */}
      <div
        {...listeners}
        className="cursor-grab mr-8 text-gray-400 hover:text-gray-600"
      >
        <GripVerticalIcon />
      </div>
      {children}
    </div>
  );
})

const OptionRow = memo(function OptionRow({ type, option, onChange }: OptionRowProps) {
  return (
    <div className="flex items-center">
      {icons[type]}
      <Input value={option.value} onChange={e => onChange?.(e, option.id)} />
    </div>
  );
});
