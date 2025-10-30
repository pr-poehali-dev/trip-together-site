'''
Business: Управление загрузкой документов для студенческих поездок
Args: event - dict с httpMethod, body, queryStringParameters
      context - object с атрибутами request_id, function_name
Returns: HTTP response dict с информацией о загруженных документах
'''

import json
import os
import base64
from typing import Dict, Any, Optional
from dataclasses import dataclass, asdict
import psycopg2
from psycopg2.extras import RealDictCursor

@dataclass
class DocumentUpload:
    user_name: str
    user_email: str
    user_phone: str
    document_type: str
    file_name: str
    file_data: str

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Email',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        user_name = body_data.get('user_name', '')
        user_email = body_data.get('user_email', '')
        user_phone = body_data.get('user_phone', '')
        document_type = body_data.get('document_type', '')
        file_name = body_data.get('file_name', '')
        file_data = body_data.get('file_data', '')
        
        file_url = f"data:application/pdf;base64,{file_data[:100]}..."
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO documents (user_name, user_email, user_phone, document_type, file_name, file_url) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (user_name, user_email, user_phone, document_type, file_name, file_url)
        )
        
        document_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'document_id': document_id,
                'message': 'Документ успешно загружен'
            })
        }
    
    if method == 'GET':
        query_params = event.get('queryStringParameters') or {}
        user_email = query_params.get('email', '')
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if user_email:
            cursor.execute(
                "SELECT id, user_name, user_email, document_type, file_name, uploaded_at FROM documents WHERE user_email = %s ORDER BY uploaded_at DESC",
                (user_email,)
            )
        else:
            cursor.execute(
                "SELECT id, user_name, user_email, document_type, file_name, uploaded_at FROM documents ORDER BY uploaded_at DESC LIMIT 50"
            )
        
        documents = cursor.fetchall()
        cursor.close()
        conn.close()
        
        documents_list = []
        for doc in documents:
            documents_list.append({
                'id': doc['id'],
                'user_name': doc['user_name'],
                'user_email': doc['user_email'],
                'document_type': doc['document_type'],
                'file_name': doc['file_name'],
                'uploaded_at': doc['uploaded_at'].isoformat() if doc['uploaded_at'] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'documents': documents_list,
                'count': len(documents_list)
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
