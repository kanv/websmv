from rest_framework.decorators import api_view
from rest_framework.response import Response
import platform
import os
import hashlib
from subprocess import Popen, PIPE, STDOUT


SUBPROCESS_TIMEOUT = 10
SANDBOX_RELATIVE_PATH = '.\\api\\sandbox\\'
PATH = os.getcwd()
MODE_VERIFICATION = 'verification'
MODE_SIMULATION = 'simulation'
NUSMV_EXE = '.\\api\\bin\\nusmv.exe'


@api_view(['POST'])
def run_simulation(request, flags):
    if platform.system() == 'Windows':
        create_file(request)
    return Response()


@api_view(['POST'])
def run_verification(request):
    if platform.system() == 'Windows':
        filename = create_file(request.body.decode('utf-8'))
        commands = create_command(filename, flags)
        output = run_in_command_line(commands, None)
        return Response(output)


def create_file(source_code):
    path = PATH + SANDBOX_RELATIVE_PATH
    hashcode = str(hashlib.sha256().hexdigest())
    filename = 'smv' + hashcode + '.smv'
    with open(path + filename, 'wt', encoding='utf-8') as f:
        f.write(source_code)
    return SANDBOX_RELATIVE_PATH + filename


def create_command(filename, flags):
    commands = []
    commands.append(NUSMV_EXE)
    commands.append(filename)
    for f in flags:
        commands.append(f)
    return commands


def run_in_command_line(commands, nusmv_commands):
    p = Popen(commands, stdout=PIPE, stdin=PIPE, stderr=STDOUT)
    stdout = p.communicate()[0].decode()
    if nusmv_commands is not None:
        for c in nusmv_commands:
            stdout += p.communicate(c)[0].decode()
    return stdout
