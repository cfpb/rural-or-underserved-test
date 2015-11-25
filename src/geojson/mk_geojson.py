#write one example for simplify by projecting;
#write a different example for simplifying in DD (0.00001)
#working off of downloaded uauc table
#create working table of state
#simplify polygon (perhaps project to GM, then try multiple distances)
#check vertex count, visual polygon coarseness etc
#use ogr2ogr to export to geojson
#check filesize

#example is vermont

import os
import psycopg2
import time
now = time.localtime(time.time())
print "start time:", time.asctime(now)

#variables
myHost = "localhost"
myPort = "5432"
myUser = "feomike"
db = "feomike"
sch = "analysis"
i_tbl = "tl_2015_us_uac10"
o_tb = "uauc"
r_tbl = "county_ru_dump"
myDist = "10"  #3, 5, 10, 13, 15
print "weeding at a distance of " + myDist
#dissolve distance in dd must be smaller than 0.001
#in projected space it is 3 M (using 900913)


def mk_working(myST):
	mySQL = "DROP TABLE IF EXISTS " + sch + ".uauc_" + myST + "; COMMIT;"
	mySQL = mySQL + "CREATE TABLE " + sch + ".uauc_" + myST + " AS "
	mySQL = mySQL + "select gid, uace10, name10, "
	mySQL = mySQL + "st_transform(st_simplifypreservetopology(st_transform(geom,900913)," 
	#mySQL = mySQL + "geom "
	mySQL = mySQL + myDist + "),4326) as geom  "
	mySQL = mySQL + "from " + sch + "." + i_tbl 
	mySQL = mySQL + " where name10 like '%" + myST + "%'; COMMIT; "
	theCur.execute(mySQL)

def del_inRural(myST):
	mySQL = "DELETE FROM " + sch + ".uauc_" + myST + " where gid in "
	mySQL = mySQL + " ( SELECT " + "uauc_" + myST + ".gid FROM " 
	mySQL = mySQL + sch + ".uauc_" + myST + ", " + sch + "." + r_tbl + " " 
	mySQL = mySQL + "where ST_Contains(" + r_tbl + ".geom, ST_Centroid("
	mySQL = mySQL + "uauc_" + myST + ".geom)) ); COMMIT;"
	theCur.execute(mySQL)
	
	
#set up the connection to the database
myConn = "dbname=" + db + " host=" + myHost + " port=" + myPort + " user=" + myUser
conn = psycopg2.connect(myConn)
theCur = conn.cursor()

states = ["AK","AL","AR","AS","AZ","CA","CO","CT"]
states = states + ["DC","DE","FL","GA","GU","HI","IA","ID"]
states = states + ["IL","IN","KS","KY","LA","MA","MD","ME"]
states = states + ["MI","MN","MO","MP","MS","MT","NC","ND"]
states = states + ["NE","NH","NJ","NM","NV","NY","OH","OK"]
states = states + ["OR","PA","PR","RI","SC","SD","TN","TX"]
states = states + ["UT","VA","VI","VT","WA","WI","WV","WY"]

#states = ["MN"]
for st in states:
	print "    doing " + st
	mk_working(st)
	del_inRural(st)
theCur.close()
del theCur