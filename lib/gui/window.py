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
keyBinds = json.loads(sys.argv[2])
style = json.loads(sys.argv[3])
window_settings = elements[0] # the fist element is always the window
#delete the window from the elements
elements.pop(0)
class window:
    def __init__(self):
        self.root = Tk()
        # ====== windows settings =======
        try:
            self.root.configure(bg=style['window']['bg-color'])
            self.root.iconbitmap(style['window']['icon'])
        except:
            print('')
        self.root.title(window_settings['title'])
        transform = f"{window_settings['width']}x{window_settings['height']}"
        self.root.geometry(transform)

    # =================== element functions ===================
        def button(obj):
            btn = Button()
            btn['width'] = obj['width']
            btn['height'] = obj['height']
            btn['text'] = obj['name']

            btn['command'] = partial(self.onClick, obj)
            #style
            try:
                btn['bg'] = style['button']['bg-color']
                btn['fg'] = style['button']['text-color']
            except:
                print('')

            btn.place(x=obj['x'], y=obj['y'], anchor="center")
        
        def checkbox(obj):
            state = IntVar()
            box = Checkbutton(self.root, text=obj['name'], height=obj['height'], variable=state)
            box['command'] = partial(self.onClick, obj, state)

            #style
            try:
                box['bg'] = style['checkbox']['bg-color']
                box['fg'] = style['checkbox']['text-color']
            except:
                print('')

            box.place(x=obj['x'], y=obj['y'], anchor="center")
        
        def label(obj):
            lbl = Label()
            lbl['text'] = obj['text']
            lbl['width'] = obj['width']
            lbl['height'] = obj['height']

            #style
            try:
                lbl['bg'] = style['label']['bg-color']
                lbl['fg'] = style['label']['text-color']
            except:
                print('')

            lbl.place(x=obj['x'], y=obj['y'], anchor="center")
        
        def combo_box(obj):
            box = ttk.Combobox(self.root)
            box['values'] = obj['values']
            box['width'] = obj['width']
            box['height'] = obj['height']

            box.bind('<<ComboboxSelected>>', partial(self.onSelect, obj))
            box.current(obj['default'])
            box.place(x=obj['x'], y=obj['y'], anchor="center")
    
    # ================== object constructor ===================
        for obj in elements:
            types = {
                'button': button,
                'checkbox': checkbox,
                'label': label,
                'combobox': combo_box
            }
            # look at the objects type
            create = types.get(obj['tag'])
            create(obj)
        
    # ====================== bind keys ========================
        for key in keyBinds:
            self.root.bind(key['key'], partial(self.onKeyPress, key))

        # start the main loop
        self.root.mainloop()
    
    # ==================== event functions ====================
    def onClick(self, obj, extra = None):
        if extra:
            print(f"{obj['id']}<{extra.get()}>")

        print(obj['id'])
    def onSelect(self, obj, event=None):
        if event:
            print(f"{obj['id']}<{event.widget.get()}>")
    def onKeyPress(self, key, event):
         print(f"{key['id']}<{event.keysym}>")


#© Copyright Rick Lugtigheid
if __name__ == '__main__':
    #© Rick Lugtigheid
    app = window()
    #start the main loop
    app.root.mainloop()