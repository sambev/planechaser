from twisted.web.server import Site
from twisted.web.resource import Resource
from twisted.web.static import File
from twisted.internet import reactor
from jinja2 import Environment, FileSystemLoader

#=============================
# JINJA CONFIG
#=============================
jloader = FileSystemLoader('./', encoding='utf-8')
JENV = Environment(
    block_start_string='[[',
    block_end_string=']]',
    variable_start_string='[-',
    variable_end_string='-]',
    comment_start_string='[#',
    comment_end_string='#]',
    loader=jloader,
    extensions=[],
)


def jrender(request, template_file, params={}):
    """
    Useful helper method to have Jinja return the rendered html file
    """
    request.setHeader('content-type', 'text/html')
    return JENV.get_template(template_file).render(params).encode('utf-8')



class Main(Resource):
    """
    Main resource, renders the index page.
    """
    isLeaf = True

    def render_GET(self, request):
        return jrender(request, 'index.html', {'name': 'Sam'})



root = Resource()

#static files
static_js = File('./js')
static_css = File('./css')
static_img = File('./imgs')

root.putChild('js', static_js)
root.putChild('css', static_css)
root.putChild('imgs', static_img)
root.putChild('', Main())

site = Site(root)
reactor.listenTCP(8000, site)
reactor.run()
