'use client';

import { MenuItem } from "@/app/data/menuItem.type";
import ToogleInput from "@/app/ui/ToogleInput";
import Form from "next/form";
import { toggleMenuItemVisibilityAction } from "../ItemForm/actions";

export default function MenuItemVisibilityToggle({ item }: { item: MenuItem }) {
  return (
    <Form action={ toggleMenuItemVisibilityAction }>
      <input type="hidden" name="id" value={ item.id } />
      
      <ToogleInput
        defaultChecked={ item.visible }
        icon="visibility"
        id={ `visibility-${ item.id }` }
        labelText={ item.visible ? "Visível" : "Oculto" }
        name="visible"
        onChange={ (event) => event.currentTarget.form?.requestSubmit() }
        type="checkbox"
      />
    </Form>
  );
}
