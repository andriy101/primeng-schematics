#!/usr/bin/env bash

no_angular_app_warning () {
  echo
  png-utils chalk '***************************************************************' yellow
  png-utils chalk 'This command should be run from within angular application root' yellow
  png-utils chalk '***************************************************************' yellow
  echo
}

commands="new generate g theme add"
if [[ $commands =~ (^|[[:space:]])$1($|[[:space:]]) ]] && [ $2 ] || [ $1 = "theme" ] ; then
  ARGS=()

  if  [ "$1" = "new" ] ; then
    if  [ "$2" = "help" ] || [ "$2" = "--help" ] || [ "$2" = "-h" ] ; then
      png-utils help new
    else
      # try to fetch version number from the args (for example: v=8)
      VERSION=latest
      for ARG in "$@"; do
        if [[ "$ARG" =~ ^v=* ]]; then
          VERSION="${ARG: -1}.x.x"
        else
          ARGS+=" $ARG"
        fi
      done
      
      VERSION=7.x.x

      if [[ "$OSTYPE" == "msys" ]] ; then
        npx -p primeng-schematics@$VERSION -p @angular/cli@$VERSION ng $ARGS -c primeng-schematics
      else 
        npx -p primeng-schematics@$VERSION -p @angular/cli@$VERSION -c "ng $ARGS -c primeng-schematics"
      fi

      # cd to the newly created app and start the app
      cd $2
      echo 
      `npm bin`/png-utils figlet "version: $VERSION"
      echo 
      `npm bin`/png-utils figlet 'ng serve' 
      echo 
      `npm bin`/ng serve -o
    fi
  elif [ "$1" = "g" ] || [ "$1" = "generate" ] ; then
    if  [ "$2" = "help" ] || [ "$2" = "--help" ] || [ "$2" = "-h" ] ; then
      png-utils help g
    elif [ ! -f package.json ] || [ ! -f angular.json ] ; then
      no_angular_app_warning
    else
      `npm bin`/ng $ARGS
    fi
  elif [ "$1" = "theme" ] ; then
    if  [ "$2" = "help" ] || [ "$2" = "--help" ] || [ "$2" = "-h" ] ; then
      png-utils help theme
    elif [ ! -f package.json ] || [ ! -f angular.json ] ; then
      no_angular_app_warning
    else
      `npm bin`/ng add primeng-schematics --changeThemeOnly $ARGS
    fi
  elif [ "$1" = "add" ] ; then
    if [ "$2" = "help" ] || [ "$2" = "--help" ] || [ "$2" = "-h" ] ; then
      png-utils help add
    elif [ ! -f package.json ] || [ ! -f angular.json ] ; then
      no_angular_app_warning
    else
      `npm bin`/ng add primeng-schematics $ARGS
    fi
  elif [ "$1" = "help" ] ; then
    png-utils help
  fi 
else
  png-utils help
fi  