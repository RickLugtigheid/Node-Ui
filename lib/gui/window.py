# ====================== imports =========================
from tkinter import *
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
#delete the window from the elements
elements.pop(0)
print(elements)
class window:
    def __init__(self):
        self.root = Tk()
        # ====== windows settings =======
        self.root.title(window_settings['title'])
        transform = f"{window_settings['width']}x{window_settings['height']}"
        print(transform)
        self.root.geometry(transform)
        # self.root.minsize(width=window_settings['width'], height=window_settings['height'])
    
    #def init_settings(self):
        # fullscreen
        # self.root.attributes('-fullscreen', False)
        # self.fullScreenState = False
        # self.root.bind("<F11>", self.toggleFullScreen)
        # self.root.bind("<Escape>", self.quitFullScreen)

    # =================== element functions ===================
        def button(obj):
            btn = Button()
            btn['width'] = obj['width']
            btn['height'] = obj['height']
            btn['text'] = obj['name']

            btn['command'] = partial(self.onClick, obj)

            btn.place(x=obj['x'] - (obj['width'] * 5),y=obj['y'] - (obj['height'] * 5)) # pos - tranform so it will be for example right in the center
        
        def label(obj):
            lbl = Label()
            lbl['text'] = obj['text']
            lbl['width'] = obj['width']
            lbl['height'] = obj['height']
            lbl.place(x=obj['x'] - (obj['width'] * 5),y=obj['y'] - (obj['height'] * 5)) # pos - tranform so it will be for example right in the center
    
    # ================== object constructor ===================
        for obj in elements:
            types = {
                'button': button,
                'label': label
            }
            print(obj)
            print(obj['tag'])
            # look at the objects type
            create = types.get(obj['tag'])
            create(obj)
        # start the main loop
        self.root.mainloop()
    
    # ==================== event functions ====================
    def onClick(self, obj):
        print(obj['id'])


#© Copyright Rick Lugtigheid
if __name__ == '__main__':
    #© Rick Lugtigheid
    app = window()
    #start the main loop
    app.root.mainloop()