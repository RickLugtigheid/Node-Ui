# ====================== imports =========================
from tkinter import *
from tkinter import ttk
import sys
import json
from functools import partial


# ================ disable buffer mode ===================
import os
buf_arg = 0
if sys.version_info[0] == 3:
    os.environ['PYTHONUNBUFFERED'] = '1'
    buf_arg = 1
sys.stdout = os.fdopen(sys.stdout.fileno(), 'a+', buf_arg)
sys.stderr = os.fdopen(sys.stderr.fileno(), 'a+', buf_arg)
# =========================================================
elements = json.loads(sys.argv[1])
window_settings = elements[0] # the fist element is always the window
keyBinds = json.loads(sys.argv[2])
style = window_settings['stylesheet']# json.loads(sys.argv[3])
#delete the window from the elements
elements.pop(0)
class window:
    def __init__(self):
        print(window_settings)
        self.root = Tk()
        # ====== windows settings =======
        try:
            if not window_settings['resize']:
                self.root.resizable(False, False)
                
            if 'icon' in style['window']:
                self.root.iconbitmap(style['window']['icon'])
            
            if 'bg-color' in style['window']:
                self.root.configure(bg=style['window']['bg-color'])
        except:
            print(None)
        
        self.root.title(window_settings['title'])
        transform = f"{window_settings['width']}x{window_settings['height']}"
        self.root.geometry(transform)

    # =================== element functions ===================
        def button(obj, master):
            btn = Button(master)
            btn['width'] = obj['width']
            btn['height'] = obj['height']
            btn['text'] = obj['name']

            btn['command'] = partial(self.onClick, obj['id']['click'])
            #style
            try:
                btn_style = style['button']
                if('button' in style):
                    btn['bg'] = btn_style['bg-color']
                    btn['fg'] = btn_style['text-color']

                if('button-active' in style):
                    btn['activebackground'] = style['button-active']['bg-color']
                    btn['activeforeground'] = style['button-active']['text-color']
                
                
                if('button-hover' in style):
                    hover = style['button-hover']
                    btn.bind("<Enter>", partial(self.hoverEvent, btn, [hover['bg-color'], hover['text-color']]))
                    btn.bind("<Leave>", partial(self.hoverEvent, btn, [btn_style['bg-color'], btn_style['text-color']]))

                if('font' in btn_style):
                    font = btn_style['font']
                    btn.config(font=(font['font'], font['font-size']))
                    btn.config(font=(font['font'], font['font-size'], font['font-style']))
            except:
                print(None)

            btn.place(x=obj['x'], y=obj['y'], anchor="center")
        
        def checkbox(obj, master):
            state = IntVar()
            box = Checkbutton(master, text=obj['name'], height=obj['height'], variable=state)
            box['command'] = partial(self.onClick, obj['id']['click'], state)

            #style
            try:
                cbox_style = style['checkbox']
                if('checkbox' in style):
                    box['bg'] = cbox_style['bg-color']
                    box['fg'] = cbox_style['text-color']

                if('checkbox-active' in style):
                    box['activebackground'] = style['checkbox-active']['bg-color']
                    box['activeforeground'] = style['checkbox-active']['text-color']

                if('font' in cbox_style):
                    font = cbox_style['font']
                    btn.config(font=(font['font'], font['font-size']))
                    btn.config(font=(font['font'], font['font-size'], font['font-style']))
            except:
                print(None)

            box.place(x=obj['x'], y=obj['y'], anchor="center")

        def textbox(obj, master):
            box = Entry(master)
            box['width'] = obj['width']

            box.bind('<Return>', partial(self.onSelect, obj['id']['retrun']))
            box.bind("<KeyRelease>", partial(self.onSelect, obj['id']['change']))
            print(obj)
            if obj['hidden'] is True:
                box.config(show="*")

            box.place(x=obj['x'], y=obj['y'], anchor="center")

        def label(obj, master):
            lbl = Label(master, text=obj['text'], width=obj['width'], height=obj['height'])
            #style
            try:
                lbl_style = style['label']
                if('label' in style):
                    lbl['bg'] = lbl_style['bg-color']
                    lbl['fg'] = lbl_style['text-color']

                if('label-hover' in style):
                    hover = style['label-hover']
                    lbl.bind("<Enter>", partial(self.hoverEvent, lbl, [lbl_style['bg-color'], hover['text-color']]))
                    lbl.bind("<Leave>", partial(self.hoverEvent, lbl, [lbl_style['bg-color'], lbl_style['text-color']]))

                if('font' in style['label']):
                    font = lbl_style['font']
                    lbl.config(font=(font['font'], font['font-size']))
                    lbl.config(font=(font['font'], font['font-size'], font['font-style']))
            except:
                print(None)
            
            # Use pixels as size
            lbl.place(x=obj['x'], y=obj['y'], anchor="center")
        
        def combo_box(obj, master):
            box = ttk.Combobox(master)
            box['values'] = obj['items']
            box['width'] = obj['width']
            box['height'] = obj['height']

            if 'change' in obj['id']:
                box.bind('<<ComboboxSelected>>', partial(self.onSelect, obj['id']['select']))
            box.current(obj['startIndex'])
            box.place(x=obj['x'], y=obj['y'], anchor="center")

        def listbox(obj, master):
            box = Listbox(master, selectmode=EXTENDED)
            for i in range(0, len(obj['items'])): 
                box.insert(i, obj['items'][i])

            if 'select' in obj['id']:
                # box.bind('<<ListboxSelect>>', partial(self.onClick, obj['id']['select'], box.curselection()))
                box.bind('<Double-1>', lambda e: print(f"{obj['id']['select']}<{box.selection_get()}>"))
            box.place(x=obj['x'], y=obj['y'], anchor="center")

        def menu(obj, master):
            print("Creating menu...")
            menu = Menu(master)
            for sub in obj['elements']:
                submenu = Menu(menu)
                for item in sub['elements']:
                    if(item['type'] == 'command'):
                        submenu.add_command(label=item['text'], command=partial(self.onClick, obj['id'])) 
                    elif(item['type'] == 'separator'):
                        submenu.add_separator()
         
                menu.add_cascade(label=sub['text'], menu=submenu)

            self.root.config(menu=menu)

    
    # ================== object constructor ===================
        def construct_obj(obj, master):
            try: 
                types = {
                    'button': button,
                    'checkbox': checkbox,
                    'label': label,
                    'combobox': combo_box,
                    'listbox': listbox,
                    'textbox': textbox,
                    'menu': menu
                }
                # look at the objects type
                create = types.get(obj['tag'])
                create(obj, master)
            except:
                print('Invalid tag given')

        for obj in elements:
            construct_obj(obj, self.root)
       
    # ====================== bind keys ========================
        for key in keyBinds:
            try:
                self.root.bind(key['key'], partial(self.onKeyPress, key))
            except:
                print(f"Could not bind key {key['key']}")

        # start the main loop
        self.root.mainloop()
    
    # ==================== event functions ====================
    def onClick(self, id, extra=None):
        if extra:
            print(f"{id}<{extra.get()}>")

        print(id)
    def onSelect(self, id, event=None):
        if event:
            print(f"{id}<{event.widget.get()}>")
        
        print(id)
    def onKeyPress(self, key, event):
         print(f"{key['id']}<{event.keysym}>")

    def hoverEvent(self, btn, colors, event=None):
        btn.configure(bg=colors[0], fg=colors[1])

#© Copyright Rick Lugtigheid
if __name__ == '__main__':
    #© Rick Lugtigheid
    app = window()
    #start the main loop
    app.root.mainloop()